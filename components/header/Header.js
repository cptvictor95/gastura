import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();

  return (
    <nav>
      <button onClick={() => router.push("/")}>home</button>
      <button onClick={() => router.push("/login")}>login</button>
    </nav>
  );
};

export default Header;
