import React from "react";
import TodoCard from "./TodoCard";
import { getTodo } from "@/actions/todo";
import { getUser, verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Todos() {
  // verifyin if the user is authenticated and there is an active session
  const session = await verifySession();
  if (!session) {
    redirect("/auth/login");
  }

  // getting user todos
  const user = await getUser();
  const todos = await getTodo(user?.id!);
  console.log(todos);

  return (
    <div className="w-full my-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
