"use server";

import postgres from "postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function login(identifier: string) {
  try {
    const data = await sql<{ id: string }[]>`
      SELECT id FROM users WHERE email = ${identifier} LIMIT 1
    `;
    if (data.length === 0) {
      throw new Error("User not found");
    }

    const userId = data[0].id;
    const cookieStore = await cookies();

    cookieStore.set({
      name: "userId",
      value: userId,
      httpOnly: true,
      secure: true,
      path: "/",
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

export async function logout() {
  (await cookies()).delete("userId");

  redirect("/");
}

export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");

  return userId;
}
