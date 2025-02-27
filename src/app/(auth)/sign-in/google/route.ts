import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { google } from "@/auth";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "profile",
    "email",
  ]);

  const cookieSet = await cookies();

  cookieSet.set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookieSet.set("code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
