import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";
import sql from "./db";
import { DEMO_MODE } from "./config";

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
  throw new Error("SESSION_SECRET is not defined");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(encodedKey);
  } catch (error) {
    console.error("Session encryption failed:", error);
    throw new Error("Failed to encrypt session");
  }
}

export async function decrypt(
  session: string | undefined,
): Promise<SessionPayload | null> {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("Session decryption failed:", error);
    return null;
  }
}

export async function createSession(userId: string) {
  try {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.error("Session creation failed:", error);
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSessionPayload(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return decrypt(session);
}

export async function getUserId(): Promise<string | null> {
  const payload = await getSessionPayload();
  if(!payload?.userId) return null
  return payload?.userId
}
export async function getCurrentUser() {
  const payload = await getSessionPayload();
  if(!payload?.userId) return null
  return {
    userId: payload.userId,
    isDemo: DEMO_MODE
  }
}

export async function requireMutation(){
  const userId = await getCurrentUser();
  if (!userId?.userId || userId.isDemo) {
    throw new Error("Unauthorized");
  }
  return userId;
}