"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useFormState } from "react-dom";
import { deleteTodo } from "@/actions/todo";
import SubmitButton from "./SubmitButton";
import { toast } from "./ui/use-toast";

const initialState: { message: string | null } = {
  message: null,
};

const DeleteTodo = ({ id }: { id: string }) => {
  const [state, formAction] = useFormState(deleteTodo, initialState);

  useEffect(() => {
    if (state?.message!) {
      toast({ title: state?.message! });
    }
  }, [state]);

  return (
    <form action={formAction} className="">
      <Input id="id" type="hidden" name="id" value={id}></Input>
      <SubmitButton buttonText="Delete" />
    </form>
  );
};

export default DeleteTodo;
