"use server";
import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { decrypt } from "../actions/auth/session";
import { users } from "@/db/schema";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/");
  }

  return { isAuth: true, userId: session.userId as string };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, session.userId),
      columns: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    const user = data[0];

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
