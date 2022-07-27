import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import useLoggedInUser from "hooks/useLoggedInUser";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, authState, handleUserLogout } = useLoggedInUser();

  return (
    <Flex
      height="10vh"
      as="header"
      flexDirection="row"
      padding="25px"
      bgColor="green.900"
    >
      <Heading>Logo</Heading>
      <Spacer />
      {authState === "LOADING" ? (
        <></>
      ) : user ? (
        <Flex as="nav" gap="20">
          <Button variant="headerBtn" onClick={() => router.push("/")}>
            Home
          </Button>
          <Button variant="headerBtn" onClick={() => router.push("/expenses")}>
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
      ) : (
        <Flex as="nav" gap="20">
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
    </Flex>
  );
};

export default Header;
