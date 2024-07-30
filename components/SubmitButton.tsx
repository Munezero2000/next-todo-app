import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface Props {
  buttonText: string;
  isValid?: boolean;
}

export default function SubmitButton({ buttonText, isValid = true }: Props) {
  const { pending } = useFormStatus();
  const isDelete = buttonText.toLowerCase() === "delete";
  const buttonClasses = isDelete ? "bg-red-900 hover:bg-red-800" : "";
  const buttonWidth = `${buttonText.length * 0.6 + 1}rem`;

  return (
    <Button
      disabled={pending || !isValid}
      className={buttonClasses}
      aria-disabled={pending || !isValid}
      type="submit"
      style={{ width: buttonWidth }}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : buttonText}
    </Button>
  );
}
