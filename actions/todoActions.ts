import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { asc } from "drizzle-orm";
import { eq, not } from "drizzle-orm";

export const addTodo = async (title: string, description: string) => {
  return await db.insert(todo).values({ title, description }).returning();
};

export const getData = async () => {
  return await db.select().from(todo).orderBy(asc(todo.id));
};

export const editTodo = async (id: string, text: string) => {
  await db
    .update(todo)
    .set({
      title: text,
      description: text,
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

export const deleteTodo = async (id: string) => {
  await db.delete(todo).where(eq(todo.id, id));
};
