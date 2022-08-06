import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const MobileNav = () => {
  const router = useRouter();
  const { user, authState, handleUserLogout } = useLoggedInUser();

  return (
    <>
      {authState === "LOADING" ? (
        <></>
      ) : user ? (
        <Flex
          zIndex="10"
          backgroundColor="green.900"
          position="absolute"
          w="100%"
          minH="100vh"
          direction="column"
          display={{ md: "none", lg: "none", xl: "none" }}
          py="12"
        >
          <Button w="100%" variant="headerBtn" onClick={() => router.push("/")}>
            Home
          </Button>

          <Button
            variant="headerBtn"
            w="100%"
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
            w="100%"
            bgColor="beige.100"
            variant="headerBtn"
            color="black"
            onClick={handleUserLogout}
          >
            Sair
          </Button>
        </Flex>
      ) : (
        <Flex
          zIndex="10"
          backgroundColor="green.900"
          position="absolute"
          w="100%"
          minH="100vh"
          direction="column"
          display={{ md: "none", lg: "none", xl: "none" }}
          py="12"
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

export default MobileNav;
