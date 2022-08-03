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
          <Flex
            as="section"
            direction="column"
            alignItems="center"
            justify="center"
            minHeight="100%"
            gap="12"
            width="100%"
          >
            <Container px="12" py="12" borderRadius="7px" bgColor="green.900">
              <LoginForm />
              <Flex gap="4">
                <Text>Ainda não tem cadastro?</Text>
                <Link href="/register">Criar conta</Link>
              </Flex>
            </Container>
          </Flex>
        </AuthLoader>
      </Main>
    </>
  );
};

export default Login;
