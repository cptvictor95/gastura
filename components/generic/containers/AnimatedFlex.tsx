import { Flex, FlexProps } from "@chakra-ui/react";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

type Merge<P, T> = Omit<P, keyof T> & T;

type AnimatedFlexProps = Merge<FlexProps, HTMLMotionProps<"div">>;

const MotionFlex = motion(Flex);

const AnimatedFlex: React.FC<AnimatedFlexProps> = ({ children, ...rest }) => {
  return <MotionFlex {...rest}>{children}</MotionFlex>;
};

export default AnimatedFlex;
