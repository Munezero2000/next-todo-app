import React from "react";
import TodoCard from "./TodoCard";
import { getTodo } from "@/actions/todo";

export default async function Todos() {
  const todos = await getTodo();

  return (
    <div className="w-full my-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
