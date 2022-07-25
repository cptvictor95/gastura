import { Button, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import useLoggedInUser from "hooks/useLoggedInUser";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, authState, handleUserLogout } = useLoggedInUser();

  return (
    <Flex as="header" flexDirection="row" padding="25px" bgColor="green.900">
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
            bgColor="white"
            variant="headerBtn"
            color="black"
            onClick={handleUserLogout}
          >
            Sair
          </Button>
        </Flex>
      ) : (
        <ButtonGroup>
          <Button onClick={() => router.push("/")}>Home</Button>
          <Button onClick={() => router.push("/login")}>Entrar</Button>
          <Button onClick={() => router.push("/register")}>Criar conta</Button>
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default Header;
