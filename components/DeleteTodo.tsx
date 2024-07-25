"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { deleteTodo } from "@/app/actions/action";
import SubmitButton from "./SubmitButton";

const initialState: { message: string | null } = {
  message: null,
};

const DeleteTodo = ({ id }: { id: string }) => {
  const [state, formAction] = useFormState(deleteTodo, initialState);

  return (
    <form action={formAction} className="">
      <Input id="id" type="hidden" name="id" value={id}></Input>
      <SubmitButton buttonText="Delete" />
    </form>
  );
};

export default DeleteTodo;
