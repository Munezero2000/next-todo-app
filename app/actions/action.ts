"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { eq } from "drizzle-orm";

// Validating inputs with zod

export async function createTodo(prevState: any, formData: FormData) {
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
