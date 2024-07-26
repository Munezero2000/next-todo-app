import React, { useState } from "react";
import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";

const Page = () => {
  return (
    <div className="flex md:w-3/4 p-4 mx-auto flex-col items-center">
      <h1 className="text-xl w-full mb-4 bg-slate-950 hover:cursor-pointer sticky top-0 text-white py-3 rounded-sm uppercase font-bold text-center">
        Todo List Application
      </h1>
      <AddTodo />
      <Todos />
    </div>
  );
};

export default Page;
