import { UserProvider } from "@/contexts/UserContext";
import AuthLoader from "components/Auth/AuthLoader";
import Header from "@/components/Header/Header";
import RegisterForm from "components/RegisterForm/RegisterForm";
import Main from "Layout/Main";
import React from "react";
import { Container, Flex, Link, Text } from "@chakra-ui/react";

const Register: React.FC = () => {
  return (
    <UserProvider>
      <>
        <Header />
        <Main title="Cadastrar">
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
              <Container
                as="section"
                bgColor="green.900"
                px="12"
                py="12"
                pb="16"
                borderRadius="7px"
              >
                <RegisterForm />
                <Flex gap="4" mt="-2">
                  <Text>Já tem uma conta?</Text>
                  <Link href="/login">Fazer login</Link>
                </Flex>
              </Container>
            </Flex>
          </AuthLoader>
        </Main>
      </>
    </UserProvider>
  );
};

export default Register;
