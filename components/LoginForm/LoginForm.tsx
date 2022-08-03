import { AuthCtx } from "@/contexts/AuthContext";
import { emailRegEx } from "@/utils/regEx";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Flex,
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

export type LoginForm = { email: string; password: string };

const LoginForm: React.FC = () => {
  const { login } = useContext(AuthCtx);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const router = useRouter();

  const submitLoginForm = async (data: LoginForm) => {
    await handleLogin(data.email, data.password);
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);

    await router.push("/");
  };

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={handleSubmit(submitLoginForm)}
      gap="4"
      mb="4"
    >
      <Heading textAlign="center" color="gray.100">
        Faça o login
      </Heading>

      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          placeholder="email@email.com"
          {...register("email", {
            required: { value: true, message: "Digite seu email" },
            pattern: {
              value: emailRegEx,
              message: "Email inválido",
            },
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">Senha</FormLabel>
        <Input
          type="password"
          placeholder="******"
          {...register("password", {
            required: { value: true, message: "Digite sua senha" },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button variant="solid" type="submit" mt="2" width="">
        Entrar
      </Button>
    </Flex>
  );
};

export default LoginForm;
