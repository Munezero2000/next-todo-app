import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

interface Props {
  buttonText: string;
}

export default function SubmitButton({ buttonText }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} aria-disabled={pending} type="submit">
      {pending ? "Loading..." : buttonText}
    </Button>
  );
}
