"use client";
import React, { useState } from "react";
import { todoType } from "@/types/todoTypes";
import DeleteTodo from "./DeleteTodo";
import { Checkbox } from "./ui/checkbox";
import { toggleTodo } from "@/actions/todo";
import { PopoverClose } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import clsx from "clsx";
import { formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateTodo from "./UpdateTodo";

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
          <Dialog>
            <DialogTrigger className="bg-slate-950 hover:bg-slate-900 px-4 py-2 text-white rounded sm">
              Edit
            </DialogTrigger>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>Update Todo</DialogTitle>
                <DialogDescription>
                  <UpdateTodo todo={todo} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="bg-red-900 hover:bg-red-800 px-4 py-2 text-white rounded sm">
              Delete
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <p className="font-normal my-1">
                    Are you sure you want to delete this todo ?
                  </p>
                  <p className="font-medium my-2">{todo.title}</p>
                </DialogTitle>
                <DialogDescription>
                  <DeleteTodo id={todo.id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* {isEditing && />} */}
    </div>
  );
};

export default TodoCard;
