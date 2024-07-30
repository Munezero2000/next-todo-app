"use client";

import { signup } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signupSchema } from "@/actions/auth/definitions";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  return (
    <div className="w-full flex items-center justify-center">
      <form className="w-3/4 md:w-1/2 mt-32 space-y-2 border rounded-lg p-4">
        <h1 className="text-xl font-semibold text-center uppercase">
          Create an account here
        </h1>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="username">Name</Label>
          <Input
            id="username"
            {...register("name")}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {errors.password.message!.split(". ").map((error, index) => (
                  <li key={index}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <SubmitButton buttonText="Sign Up" isValid={isValid} />
        <Link className="mt-4" href="/auth/login">
          <p className="text-slate-900 text-sm hover:underline text-center">
            Have an account already? Login here
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
