// function to get the token from the session 
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_AUTH_SECRET || "";

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret, raw: true });
    // if (!token) {
    //     return NextResponse.json({ message: "No Token Founded" }, { status: 400 });
    // }
    return NextResponse.json({ token }, { status: 200 });
}