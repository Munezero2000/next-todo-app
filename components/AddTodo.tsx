"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "@radix-ui/react-label";
import { createTodo} from "@/actions/todoAction";
import { toast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

const initialState: { message: string | null } = {
  message: null,
};

interface Props {
  isEditing?: boolean;
}

const AddTodo = () => {
  const [state, formAction] = useFormState(createTodo, initialState);

  useEffect(() => {
    toast({ title: state?.message! });
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-full space-y-2 border rounded-lg p-2"
    >
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Title</Label>
        <Input
          id="title"
          name="title"
          className=""
          placeholder=" Enter a todo here"
        ></Input>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="tododesc">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Type your todo description here."
        />
      </div>
      <SubmitButton buttonText="Add Todo" />
    </form>
  );
};

export default AddTodo;
