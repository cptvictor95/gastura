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
            margin={{ base: 6, md: 0, lg: 0, xl: 0 }}
          >
            <Container px="10" py="10" borderRadius="7px" bgColor="green.900">
              <LoginForm />
              <Flex gap="4">
                <Text fontSize={{ base: 12, md: 16, lg: 16, xl: 16 }}>
                  Ainda não tem cadastro?
                </Text>
                <Link
                  fontSize={{ base: 12, md: 16, lg: 16, xl: 16 }}
                  href="/register"
                >
                  Criar conta
                </Link>
              </Flex>
            </Container>
          </Flex>
        </AuthLoader>
      </Main>
    </>
  );
};

export default Login;
