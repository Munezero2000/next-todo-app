import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="mt-80 flex flex-col gap-4 items-center justify-center">
      404 | Page not found
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
