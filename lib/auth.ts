import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
export type Session={id:string;name:string;email:string;role:"STUDENT"|"ADMIN"};
const secret=()=>new TextEncoder().encode(process.env.AUTH_SECRET||"local-development-secret-change-me");
export async function createSession(value:Session){const token=await new SignJWT(value).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(secret());(await cookies()).set("portal_session",token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:28800});}
export async function getSession():Promise<Session|null>{const token=(await cookies()).get("portal_session")?.value;if(!token)return null;try{return (await jwtVerify(token,secret())).payload as unknown as Session}catch{return null}}
export async function clearSession(){(await cookies()).delete("portal_session")}
