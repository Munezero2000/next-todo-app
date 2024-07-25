import React from "react";
import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";

const Page = () => {
  return (
    <div className="flex md:w-3/4 p-4 mx-auto flex-col items-center">
      <AddTodo />
      <Todos />
    </div>
  );
};

export default Page;


