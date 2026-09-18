"use server";

import sql from "./db";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";

const USER_JOHN_EMAIL = process.env.USER_JOHN_EMAIL || "";
const USER_SARAH_EMAIL = process.env.USER_SARAH_EMAIL || "";

export async function loginByEmail(identifier: string): Promise<void> {
  const data = await sql<{ id: string }[]>`
      SELECT id FROM users WHERE email = ${identifier} LIMIT 1
    `;
  if (data.length === 0) {
    throw new Error("User not found");
  }

  const userId = data[0].id;

  await createSession(userId);

  redirect("/dashboard");
}

export async function loginAsJohn(): Promise<void> {
  await loginByEmail(USER_JOHN_EMAIL);
}

export async function loginAsSarah(): Promise<void> {
  await loginByEmail(USER_SARAH_EMAIL);
}

export async function logout() {
  await deleteSession();

  redirect("/");
}