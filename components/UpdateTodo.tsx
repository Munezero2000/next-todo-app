import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButton";
import { todoType } from "@/types/todoTypes";
import { useFormState } from "react-dom";
import { updateTodo } from "@/actions/todo";
import { toast } from "./ui/use-toast";

interface Props {
  todo: todoType;
  onSuccess: () => void;
}

const UpdateTodo = ({ todo, onSuccess }: Props) => {
  const [state, formAction] = useFormState(updateTodo, undefined);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  useEffect(() => {
    if (state?.message) {
      toast({ title: state.message });
      if (state.message === "Todo updated successfully") {
        onSuccess();
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full space-y-2 transition-all">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Title</Label>
        <Input id="id" name="id" className="hidden" value={todo.id}></Input>
        <Input
          id="title"
          name="title"
          className=""
          onInput={(e: any) => setTitle(e.target.value)}
          placeholder=" Enter a todo here"
          value={title}
        ></Input>
        <div>
          {state?.errors?.title && (
            <p className="text-sm text-red-500">{state.errors.title}</p>
          )}
        </div>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="tododesc">Description</Label>
        <Textarea
          id="description"
          name="description"
          onChange={(e: any) => setDescription(e.target.value)}
          value={description}
          placeholder="Type your todo description here."
        />
        <div>
          {state?.errors?.description && (
            <p className="text-sm text-red-500">{state.errors.description}</p>
          )}
        </div>
      </div>
      <SubmitButton buttonText="Update Todo" />
    </form>
  );
};

export default UpdateTodo;
