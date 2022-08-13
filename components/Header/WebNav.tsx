import React from "react";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Button, Flex, Image, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";

const WebNav = () => {
  const router = useRouter();
  const { user, authState, handleUserLogout } = useLoggedInUser();

  return (
    <>
      {authState === "LOADING" ? (
        <></>
      ) : user ? (
        <Flex
          display={{ base: "none", md: "flex", lg: "flex", xl: "flex" }}
          minHeight="10vh"
          as="header"
          flexDirection="row"
          align="center"
          bgColor="green.900"
          px="12"
        >
          <Image
            src="/assets/Logo.svg"
            boxSize="90px"
            alt="logoImage"
            fallbackSrc=""
          />
          <Spacer />
          <Flex as="nav" gap="20">
            <Button variant="headerBtn" onClick={() => router.push("/")}>
              Home
            </Button>

            <Button
              variant="headerBtn"
              onClick={() => router.push("/expenses")}
            >
              Gastos
            </Button>
            <Button variant="headerBtn" onClick={() => router.push("/budgets")}>
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
          </Flex>
        </Flex>
      ) : (
        <Flex
          display={{ base: "none", md: "flex", lg: "flex", xl: "flex" }}
          minHeight="10vh"
          as="header"
          flexDirection="row"
          align="center"
          bgColor="green.900"
          px="12"
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
        </Flex>
      )}
    </>
  );
};

export default WebNav;
