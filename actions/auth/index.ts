"use server";
import db from "@/db/drizzle";
import { FormState, LoginFormSchema, LoginFormState } from "./definitions";
import { SignupSchema } from "./definitions";
import bcrypt from "bcrypt";
import { users } from "@/db/schema";
import { createSession, deleteSession } from "@/actions/auth/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  // Validate form fields
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUser = await db.select().from(users).where(eq(users.email, email));
  console.log(checkUser);
  if (checkUser.length > 0) {
    return {
      message: "This is email has been taken use another email",
    };
  }

  const data = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning();

  const user = data[0];

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  } else {
    redirect("/auth/login?message=Account created successfully");
  }
}

export async function login(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  const user = await db.select().from(users).where(eq(users.email, validatedFields.data.email));
  if (user.length === 0) {
    return { message: "Invalid email or password." };
  }
  const loggedUser = user[0];
  console.log(loggedUser);

  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(validatedFields.data.password, loggedUser.password);

  // If the password does not match, return early
  if (!passwordMatch) {
    return { message: "Invalid email or password." };
  }

  // 4. If login successful, create a session for the user and redirect
  const userId = loggedUser.id.toString();
  await createSession(userId);
  redirect("/todos");
}

export async function logout() {
  deleteSession();
}
