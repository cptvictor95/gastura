import { HamburgerIcon } from "@chakra-ui/icons";

import React, { useState } from "react";

import MobileNav from "./MobileNav";
import WebNav from "./WebNav";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMobileNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <WebNav />
      <HamburgerIcon
        position="absolute"
        top="5"
        right="5"
        zIndex="20"
        display={{ md: "none", lg: "none", xl: "none" }}
        onClick={handleMobileNav}
        color="beige.100"
      />
      {isOpen === true ? <MobileNav /> : <></>}
    </>
  );
};

export default Header;
/*
@todo fix unlogged nav direction
*/
