import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(){
   try{

    const cookieStore = await cookies();


    cookieStore.set({
        name: "token",
        value: "",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge:60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
   } catch (error){
    console.error("logout error:", error);
    return NextResponse.json(
        { success: false, message: "logout failed"}, 
    { status: 500 });
   }
}