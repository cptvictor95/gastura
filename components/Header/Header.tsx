import React from "react";

import MobileNav from "./MobileNav";
import WebNav from "./WebNav";

const Header: React.FC = () => {
  return (
    <>
      <WebNav />
      <MobileNav />
    </>
  );
};

export default Header;
