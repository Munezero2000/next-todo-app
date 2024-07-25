"use client";
import { Checkbox } from "@radix-ui/react-checkbox";
import React from "react";
import { todoType } from "@/types/todoTypes";
import DeleteTodo from "./DeleteTodo";

interface Props {
  todo: todoType;
}

const TodoCard = ({ todo }: Props) => {
  return (
    <div className="bg-slate-100 flex p-2 items-center justify-between rounded-md my-2">
      <Checkbox />
      <div className="w-3/4">
        <p>{todo.title} </p>
        <p className="text-sm">{todo.description}</p>
        <p className="text-xs text-slate-700">{`Created At: ${todo.createdAt}`}</p>
      </div>
      <div className="flex gap-2">
        <DeleteTodo id={todo.id} />
      </div>
    </div>
  );
};

export default TodoCard;
