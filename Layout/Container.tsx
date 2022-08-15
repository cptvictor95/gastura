import React from "react";
import { Flex } from "@chakra-ui/react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Flex minWidth="100%">{children}</Flex>;
};

export default Container;
