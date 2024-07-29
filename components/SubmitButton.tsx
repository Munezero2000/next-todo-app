import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface Props {
  buttonText: string;
}

export default function SubmitButton({ buttonText }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={buttonText.toLowerCase() === "delete" ? "bg-red-900 hover:bg-red-800" : ""}
      aria-disabled={pending}
      type="submit"
    >
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        buttonText
      )}
    </Button>
  );
}
