"use client";
import React, { useState } from "react";
import { todoType } from "@/types/todoTypes";
import DeleteTodo from "./DeleteTodo";
import { Checkbox } from "./ui/checkbox";
import { toggleTodo } from "@/actions/todoAction";
import { Button } from "./ui/button";
import clsx from "clsx";
import UpdateTodo from "./UpdateTodo";

interface Props {
  todo: todoType;
}

const TodoCard = ({ todo }: Props) => {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    await toggleTodo(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div
        className={clsx(
          "shadow-sm flex p-2 items-center justify-between rounded-md my-2",
          { "bg-gray-300": todo.completed, "bg-slate-100": !todo.completed }
        )}
      >
        <div className="flex items-center justify-center min-w-8 lg:min-w-16">
          <Checkbox
            checked={isChecked}
            onClick={handleCheckboxChange}
            className="p-2"
          />
        </div>
        <div className="w-3/4">
          <p>{todo.title}</p>
          <p className="text-sm">{todo.description}</p>
          <p className="text-xs text-slate-700">{`Created At: ${todo.createdAt}`}</p>
        </div>
        <div className="flex gap-2 transition-all ease-in-out">
          <Button onClick={handleEditClick}>
            {isEditing ? "Close" : "Edit"}
          </Button>
          <DeleteTodo id={todo.id} />
        </div>
      </div>
      {isEditing && <UpdateTodo todo={todo} />}
    </div>
  );
};

export default TodoCard;
