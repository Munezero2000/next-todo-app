import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButton";
import { todoType } from "@/types/todoTypes";
import { useFormState } from "react-dom";
import { updateTodo } from "@/actions/todoAction";
import { toast } from "./ui/use-toast";
import { Description } from "@radix-ui/react-toast";

interface Props {
  todo: todoType;
}

const initialState: { message: string | null } = {
  message: null,
};

const UpdateTodo = ({ todo }: Props) => {
  const [state, formAction] = useFormState(updateTodo, initialState);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  useEffect(() => {
    toast({ title: state?.message! });
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
      </div>
      <SubmitButton buttonText="Update Todo" />
    </form>
  );
};

export default UpdateTodo;
