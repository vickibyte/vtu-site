import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/config/db";




export async function POST(request: Request) {
  try {
    const { fullname, email, phone, password } = await request.json();

    if (!fullname || !email || !phone || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if user already exists
    const [existing]: any = await pool.query(
      "SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1",
      [email || null, phone]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "The email or phone number is already in our system, use another" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    const [result]: any = await pool.query(
      "INSERT INTO users (fullname, email, phone, password_hash) VALUES (?, ?, ?, ?)",
      [fullname, email || null, phone,  hashedPassword]
    );

    // return created user (no password)
    return NextResponse.json(
      {
        id: result.insertId,
        fullname,
        email,
        phone,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
