"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { asc, desc, eq, not } from "drizzle-orm";
import { todoType } from "@/types/todoTypes";
import { FormState, todoSchema } from "./definitions";
import { getUser } from "@/lib/dal";

export const getTodo = async (id: string): Promise<todoType[]> => {
  const todos = await db
    .select()
    .from(todo)
    .where(eq(todo.createdBy, id))
    .orderBy(asc(todo.completed), desc(todo.createdAt));
  return todos;
};

export async function createTodo(state: FormState, formData: FormData): Promise<FormState> {
  // validate form inputs
  const validatedFields = todoSchema.safeParse({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  });

  // if form is not valid return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validatedFields.data;
  const user = await getUser();

  // saving data to the database
  try {
    const returnedTodo = await db.insert(todo).values({ title, description, createdBy: user?.id }).returning();

    if (returnedTodo) {
      revalidatePath("/");
      return { message: "Todo added successfully" };
    } else {
      return { message: "An error occured while saving todo" };
    }
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

export async function updateTodo(state: FormState, formData: FormData): Promise<FormState> {
  const id = formData.get("id") as string;

  const validatedFields = todoSchema.safeParse({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  });

  // if form is not valid return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validatedFields.data;

  try {
    const updateTodo = await db
      .update(todo)
      .set({
        title,
        description,
      })
      .where(eq(todo.id, id))
      .returning();

    if (updateTodo) {
      revalidatePath("/");
      return { message: "Todo updated successfully" };
    } else {
      return { message: "An error occured while updating todo" };
    }
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
