"use server";

import { revalidatePath } from "next/cache";
import { SignJWT } from "jose";
import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { asc, desc, eq, not } from "drizzle-orm";
import { z } from "zod";
import { todoType } from "@/types/todoTypes";

// Validating inputs with zod
const schema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().optional(),
});

export const getTodo = async (): Promise<todoType[]> => {
  const todos = await db
    .select()
    .from(todo)
    .orderBy(asc(todo.completed), desc(todo.createdAt));

  return todos;
};

export async function createTodo(
  prevState: { message: string | null },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const parse = schema.safeParse({ title, description });

  if (!parse.success) {
    return { message: "✂️Todo is required" };
  }

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

export async function updateTodo(
  prevState: { message: string | null },
  formData: FormData
) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const parse = schema.safeParse({ title, description });

  if (!parse.success) {
    return { message: "✂️Todo is required" };
  }

  try {
    await db
      .update(todo)
      .set({
        title,
        description,
      })
      .where(eq(todo.id, id));

    revalidatePath("/");
    return { message: "Todo updated successfully" };
  } catch (e) {
    console.log(e);
    return { message: "Failed to update todo" };
  }
}

export const toggleTodo = async (id: string) => {
  try {
    await db
      .update(todo)
      .set({
        completed: not(todo.completed),
      })
      .where(eq(todo.id, id));
    revalidatePath("/");

    return { message: "Successfully Marked" };
  } catch (e) {
    return { message: "Failed to update todo" };
  }
};
