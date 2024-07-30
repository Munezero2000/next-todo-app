"use client";

import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createTodo } from "@/actions/todo";
import { toast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { Label } from "./ui/label";
import { TodoFormData, todoSchema } from "@/actions/todo/definitions";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";

const AddTodo = () => {
  const [state, formAction] = useFormState(createTodo, undefined);

  useEffect(() => {
    if (state?.message!) {
      toast({ title: state?.message! });
      if (state?.message! === "Todo added successfully") {
        reset();
      }
    }
  }, [state]);

  const {
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<TodoFormData>({ resolver: zodResolver(todoSchema) });

  return (
    <form
      action={formAction}
      className="w-full space-y-2 border rounded-lg p-4"
    >
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Title</Label>
        <Input
          {...register("title")}
          className=""
          placeholder="Enter a todo here"
        ></Input>
        <div>
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="tododesc">Description</Label>
        <Textarea
          {...register("description")}
          id="description"
          placeholder="Type your todo description here."
        />
        <div>
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>
      <SubmitButton buttonText="Add Todo" isValid={isValid} />
    </form>
  );
};

export default AddTodo;
