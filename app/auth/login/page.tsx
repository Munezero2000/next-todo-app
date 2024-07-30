"use client";

import { login } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/actions/auth/definitions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  const {
    register,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form
        action={formAction}
        className="w-3/4 md:w-1/2 mt-32 space-y-2 border rounded-lg p-4"
      >
        <h1 className="text-xl font-semibold text-center">Login Here</h1>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
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
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {errors.password?.message!
                  .split(". ")
                  .map((error, index) => <li key={index}>- {error}</li>)}
              </ul>
            </div>
          )}
        </div>
        <SubmitButton buttonText="Login" isValid={isValid} />
        <Link href="/auth/signup">
          <p className="text-slate-900 text-sm hover:underline text-center">
            Don't have an account? Create one here
          </p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
