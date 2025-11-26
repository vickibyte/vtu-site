import { NextResponse } from "next/server";
import pool from "@/config/db";
import { verifyToken } from "../api/auth/verifytoken";

export async function GET(request: Request) {
  const userData: any = verifyToken(request);

  if (!userData) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

   if (userData.role !== "admin") {
    return NextResponse.json(
        { error: "Access denied" }, 
        { status: 403 });
  }

  const [rows] = await pool.query(
    "SELECT id, fullname, email, phone, wallet, role, created_at FROM users WHERE id = ? LIMIT 1",
    [userData.id]
  );

  if (!rows) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const [users]: any = await pool.query(
    "SELECT id, fullname, email, phone, wallet, role FROM users"
  );

  return NextResponse.json({ users, user: rows });
}