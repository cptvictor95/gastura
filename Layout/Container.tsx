import { Flex } from "@chakra-ui/react";
import React from "react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Flex minWidth="100%">{children}</Flex>;
};

export default Container;
