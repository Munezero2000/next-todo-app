"use server";

import { revalidatePath } from "next/cache";
import { SignJWT } from "jose";
import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { eq } from "drizzle-orm";

const key = new TextEncoder().encode(process.env.NEXT_AUTH_SECRET!);

// Validating inputs with zod

export async function createTodo(
  prevState: { message: string | null },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    await db.insert(todo).values({ title, description }).returning();

    revalidatePath("/");

    return { message: "Todo added successfully" };
  } catch (e) {
    return { message: "Failed to add todo" };
  }
}

export async function deleteTodo(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await db.delete(todo).where(eq(todo.id, id)).returning();

    revalidatePath("/");

    return { message: "Deleted Todo successfully" };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}

export async function encrypt(payload: any) {
  // this function will encrypt the pay load and give a token back
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "H256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function login(formData: FormData) {
  // talk to the database and get user data
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // calculate session expration time and set the variable
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });
}
