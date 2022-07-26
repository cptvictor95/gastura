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
            <Container
              as="section"
              bgColor="green.900"
              px="12"
              py="12"
              maxWidth="md"
              borderRadius="7px"
            >
              <RegisterForm />
              <Flex mt="3" gap="4">
                <Text>Já tem uma conta?</Text>
                <Link href="/login">Fazer login</Link>
              </Flex>
            </Container>
          </AuthLoader>
        </Main>
      </>
    </UserProvider>
  );
};

export default Register;
