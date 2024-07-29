"use client";
import { logout } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      onClick={async () => handleLogout()}
      className="bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-800"
    >
      Sign out
    </Button>
  );
};

export default Logout;
