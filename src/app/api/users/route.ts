import pool from "@/config/db";
import { NextResponse } from "next/server";



export async function GET() {
    try {
    
        const [rows] = await pool.query("SELECT * FROM users");
            return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error })
}
}