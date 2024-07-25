import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { deleteTodo } from "@/app/actions/action";
import { toast } from "./ui/use-toast";
import SubmitButton from "./SubmitButton";

const initialState: { message: string | null } = {
  message: null,
};

const DeleteTodo = ({ id }: { id: string }) => {
  const [state, formAction] = useFormState(deleteTodo, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="">
      <Input id="id" type="hidden" name="id" value={id}></Input>
      <SubmitButton buttonText="Delete" />
    </form>
  );
};

export default DeleteTodo;
