import { Box, Button, Flex, Spacer, Image } from "@chakra-ui/react";
import useLoggedInUser from "hooks/useLoggedInUser";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, authState, handleUserLogout } = useLoggedInUser();

  return (
    <Flex
      minHeight="10vh"
      as="header"
      flexDirection="row"
      padding="25px"
      bgColor="green.900"
    >
      <Box>
        <Image
          src="https://img.r7.com/images/2016/03/16/4b0yflv637_22y37gtes1_file.jpg"
          alt="vitinbocamole"
          boxSize="50px"
        />
      </Box>
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
