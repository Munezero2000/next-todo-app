import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(5, { message: 'Todo must be at least 5 characters long' }).max(300).trim(),
  description: z.string().max(500, { message: 'description must be 500 or less' }).default(''),
});

export const signupSchema = z.object({
  
});

export type FormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;
