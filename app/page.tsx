import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-64">
      <p>Welcome to the Next todo app</p>
      <div>
        <Link href="/auth/login">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
