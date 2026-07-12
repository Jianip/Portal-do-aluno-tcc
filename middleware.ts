import { NextRequest,NextResponse } from "next/server";
export function middleware(req:NextRequest){const session=req.cookies.get("portal_session");if(!session)return NextResponse.redirect(new URL("/login",req.url));return NextResponse.next()}
export const config={matcher:["/portal/:path*","/admin/:path*"]};
