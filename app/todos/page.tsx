import React, { useState } from "react";
import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { redirect } from "next/navigation";
import Logout from "@/components/Logout";

const Page = () => {
  return (
    <div className="flex md:w-3/4 p-4 mx-auto flex-col items-center">
      <div className="flex items-center px-4 justify-between w-full mb-4 rounded-sm bg-slate-950">
        <Link
          href="/"
          className="text-xl w-fullbg-slate-950 hover:cursor-pointer sticky top-0 text-white py-3  uppercase font-bold text-center"
        >
          Todo List Application
        </Link>
        <Logout />
      </div>

      <AddTodo />
      <Todos />
    </div>
  );
};

export default Page;
