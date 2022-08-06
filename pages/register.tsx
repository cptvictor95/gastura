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
              width="100%"
              margin={{ base: 6, md: 0, lg: 0, xl: 0 }}
            >
              <Container
                as="section"
                bgColor="green.900"
                px="12"
                py="8"
                pb="12"
                borderRadius="7px"
              >
                <RegisterForm />
                <Flex gap="4">
                  <Text fontSize={{ base: 12, md: 16, lg: 16, xl: 16 }}>
                    Já tem uma conta?
                  </Text>
                  <Link
                    fontSize={{ base: 12, md: 16, lg: 16, xl: 16 }}
                    href="/login"
                  >
                    Fazer login
                  </Link>
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
