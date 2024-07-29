"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createTodo } from "@/actions/todo";
import { toast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { Label } from "./ui/label";

const AddTodo = () => {
  const [state, formAction] = useFormState(createTodo, undefined);

  useEffect(() => {
    if (state?.message!) {
      toast({ title: state?.message! });
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full space-y-2 border rounded-lg p-2">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Title</Label>
        <Input id="title" name="title" className="" placeholder=" Enter a todo here"></Input>
        <div> {state?.errors?.title && <p className="text-sm text-red-500">{state.errors.title}</p>}</div>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="tododesc">Description</Label>
        <Textarea id="description" name="description" placeholder="Type your todo description here." />
        <div> {state?.errors?.description && <p className="text-sm text-red-500">{state.errors.description}</p>}</div>
      </div>
      <SubmitButton buttonText="Add Todo" />
    </form>
  );
};

export default AddTodo;
