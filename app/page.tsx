import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <div className="flex w-1/2 p-4">
      <div className="flex flex-col items-center justify-center">
        <Input className="outline-none my-4" placeholder="Title" />
        <Input placeholder="Description" />
      </div>
    </div>
  );
};

export default page;
