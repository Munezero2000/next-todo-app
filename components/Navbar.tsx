import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <Link href="/api/auth/">Sign in</Link>
    </div>
  );
};

export default Navbar;
