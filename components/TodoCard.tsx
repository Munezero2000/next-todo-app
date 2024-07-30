"use client";
import React, { useState } from "react";
import { todoType } from "@/types/todoTypes";
import DeleteTodo from "./DeleteTodo";
import { Checkbox } from "./ui/checkbox";
import { toggleTodo } from "@/actions/todo";
import { Button } from "./ui/button";
import clsx from "clsx";
import UpdateTodo from "./UpdateTodo";
import { formatDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { toast } from "./ui/use-toast";

interface Props {
  todo: todoType;
}

const TodoCard = ({ todo }: Props) => {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    const result = await toggleTodo(todo.id);
    toast({ title: result.message });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const formattedDate = formatDate(todo.createdAt);
  return (
    <div>
      <div
        className={clsx(
          "shadow-sm flex p-2 items-center justify-between rounded-md my-2",
          {
            "bg-gray-300": todo.completed,
            "bg-slate-100": !todo.completed,
          }
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
          <p className="text-xs text-slate-700">{`${formattedDate}`}</p>
        </div>
        <div className="flex gap-2 transition-all ease-in-out">
          <Button onClick={handleEditClick}>
            {isEditing ? "Close" : "Edit"}
          </Button>
          <Popover>
            <PopoverTrigger className="bg-red-900 hover:bg-red-800 px-2 text-white rounded sm">
              Delete
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm text-slate-900 my-2">
                Are you sure you want to delete this todo ?
              </p>
              <div className="flex justify-between">
                <PopoverClose className="bg-slate-950 px-2 text-white rounded sm hover:bg-slate-900">
                  Cancel
                </PopoverClose>
                <DeleteTodo id={todo.id} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {isEditing && <UpdateTodo todo={todo} />}
    </div>
  );
};

export default TodoCard;
