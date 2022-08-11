import useLoggedInUser from "@/hooks/useLoggedInUser";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, FlexProps } from "@chakra-ui/react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";

export type Merge<P, T> = Omit<P, keyof T> & T;

type AnimatedFlexProps = Merge<FlexProps, HTMLMotionProps<"div">>;
const MotionFlex = motion(Flex);
const AnimatedFlex: React.FC<AnimatedFlexProps> = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  ...rest
}) => {
  return (
    <MotionFlex initial={initial} animate={animate} exit={exit} {...rest}>
      {children}
    </MotionFlex>
  );
};

const MobileNav = () => {
  const router = useRouter();
  const { authState, handleUserLogout } = useLoggedInUser();

  const [isOpen, setIsOpen] = useState(false);
  const handleMobileNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AnimatePresence>
      <HamburgerIcon
        position="absolute"
        top="5"
        right="5"
        zIndex="20"
        display={{ md: "none", lg: "none", xl: "none" }}
        onClick={handleMobileNav}
        color="beige.100"
      />

      {isOpen ? (
        <>
          {authState === "LOGGEDOUT" && (
            <AnimatedFlex
              zIndex="10"
              backgroundColor="green.900"
              position="absolute"
              w="100%"
              minH="100vh"
              direction="column"
              display={{ base: "flex", md: "none", lg: "none", xl: "none" }}
              py="12"
              align="center"
              gap="8"
            >
              <Button variant="headerBtn" onClick={() => router.push("/")}>
                Home
              </Button>
              <Button variant="headerBtn" onClick={() => router.push("/login")}>
                Entrar
              </Button>
              <Button
                variant="headerBtn"
                bgColor="beige.100"
                color="black"
                onClick={() => router.push("/register")}
              >
                Criar conta
              </Button>
            </AnimatedFlex>
          )}
          {authState === "LOGGEDIN" && (
            <AnimatedFlex
              zIndex="10"
              backgroundColor="green.900"
              position="absolute"
              w="100%"
              minH="100vh"
              direction="column"
              display={{ base: "flex", md: "none", lg: "none", xl: "none" }}
              py="12"
              align="center"
              gap="8"
            >
              <Button variant="headerBtn" onClick={() => router.push("/")}>
                Home
              </Button>

              <Button
                variant="headerBtn"
                onClick={() => router.push("/expenses")}
              >
                Gastos
              </Button>
              <Button
                variant="headerBtn"
                w="100%"
                onClick={() => router.push("/budgets")}
              >
                Entradas
              </Button>
              <Button
                bgColor="beige.100"
                variant="headerBtn"
                color="black"
                onClick={handleUserLogout}
              >
                Sair
              </Button>
            </AnimatedFlex>
          )}
        </>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
