import { Container, Flex, Link, Text } from "@chakra-ui/react";
import AuthLoader from "components/Auth/AuthLoader";
import Main from "Layout/Main";

import React from "react";
import Header from "../components/Header/Header";
import LoginForm from "../components/LoginForm/LoginForm";

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <Main title="Login">
        <AuthLoader>
          <Container
            as="section"
            bgColor="green.900"
            px="12"
            py="12"
            maxWidth="md"
            borderRadius="7px"
          >
            <LoginForm />
            <Flex gap="4">
              <Text>Ainda não tem cadastro?</Text>
              <Link href="/register">Criar conta</Link>
            </Flex>
          </Container>
        </AuthLoader>
      </Main>
    </>
  );
};

export default Login;
