import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { todoType } from "@/types/todoTypes";
import { asc, desc } from "drizzle-orm";
import { eq, not } from "drizzle-orm";

export const getTodo = async (): Promise<todoType[]> => {
  return await db.select().from(todo).orderBy(desc(todo.createdAt));
};

export const editTodo = async (
  id: string,
  title: string,
  description: string
) => {
  await db
    .update(todo)
    .set({
      title,
      description,
    })
    .where(eq(todo.id, id));
};

export const toggleTodo = async (id: string) => {
  await db
    .update(todo)
    .set({
      completed: not(todo.completed),
    })
    .where(eq(todo.id, id));
};
