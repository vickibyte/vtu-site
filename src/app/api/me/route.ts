import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/config/db";

export async function GET(request: Request) {
  try {
    // Get token from cookie
    const cookieHeader = request.headers.get("cookie") || "";
    const tokenCookie = cookieHeader
      .split("; ")
      .find(c => c.startsWith("token="));
    const token = tokenCookie?.split("=")[1];

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Verify JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Fetch user from DB
    const [rows]: any = await pool.query(
      "SELECT id, fullname, email, phone, wallet, role FROM users WHERE id = ? LIMIT 1",
      [decoded.id]
    );

    const user = rows[0];

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/me Error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
