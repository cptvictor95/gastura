import React from "react";
import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const AnimatedText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Text
      as={motion.p}
      initial="hidden"
      animate="visible"
      variants={variants}
      textAlign="center"
      fontSize="xl"
    >
      {children}
    </Text>
  );
};

export default AnimatedText;
