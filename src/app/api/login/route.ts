import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        await connectDB();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return NextResponse.json({ message: "Login successful", token }, { status: 200 });
    } catch (error) {
        console.error("Error logging in user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}