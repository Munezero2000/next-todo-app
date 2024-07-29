"use client";

import { signup } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const SignupForm = () => {
  const [state, actionForm] = useFormState(signup, undefined);

  useEffect(() => {
    if (state?.message) {
      toast({ title: state?.message });
    }
  });

  return (
    <div className="w-full flex items-center justify-center">
      <form action={actionForm} className="w-1/2 mt-32 space-y-2 border rounded-lg p-4">
        <h1 className="text-xl font-semibold text-center uppercase">Create an account here</h1>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="username">Name</Label>
          <Input id="username" name="username" className="" placeholder="Enter your name" />
          <div> {state?.errors?.name && <p className="text-sm text-red-500">{state.errors.name}</p>}</div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" className="" placeholder="Enter your email" />
          <div> {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email}</p>}</div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" className="" placeholder="Enter your password" />
          {state?.errors?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <SubmitButton buttonText="Sign Up" />
        <Link className="mt-4" href="/auth/login">
          <p className="text-slate-900 text-sm hover:underline text-center">Have an account already? login here</p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
