"use client";
import { login, signup } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, actionForm] = useFormState(login, undefined);
  useEffect(() => {
    if (state?.message) {
      toast({ title: state?.message });
    }
  });
  return (
    <div className="w-full flex  flex-col items-center justify-center">
      <form action={actionForm} className="w-1/2 mt-32 space-y-2 border rounded-lg p-4">
        <h1 className="text-xl font-semibold text-center"> Login Here</h1>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" className="" placeholder="Enter your email" />
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
        <SubmitButton buttonText="Login" />
        <Link className="" href="/auth/signup">
          <p className="text-slate-900 text-sm hover:underline text-center">Don't have an account create one here</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
