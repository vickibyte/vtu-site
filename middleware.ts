import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        // Not logged in → redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        if (!decoded || typeof decoded !== "object" || !decoded.role) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const url = request.nextUrl.clone();

        // Admin trying to access admin routes → allow
        if (decoded.role === "admin" && url.pathname.startsWith("/admin")) {
            return NextResponse.next();
        }

        // Regular user trying to access dashboard → allow
        if (decoded.role === "user" && url.pathname.startsWith("/dashboard")) {
            return NextResponse.next();
        }

        // Role mismatch → redirect to their proper page
        if (decoded.role === "admin") {
            url.pathname = "/admin"; // admin default page
        } else {
            url.pathname = "/dashboard"; // user default page
        }
        return NextResponse.redirect(url);

    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/dashboard/:path*",
    ],
};
