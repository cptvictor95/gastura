import { UserCtx } from "@/contexts/UserContext";
import { emailRegEx } from "@/utils/regEx";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FirebaseCtx } from "config/context";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const { auth } = useContext(FirebaseCtx);
  const { createUser } = useContext(UserCtx);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormProps>({ mode: "onChange" });
  const router = useRouter();

  const submitRegisterForm = (data: RegisterFormProps) => {
    handleRegister(data);
  };

  // Creates a new user on firebase authentication and adds a new document to firestore users
  const handleRegister = async ({
    name,
    email,
    password,
  }: RegisterFormProps) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUser({
        uid: response.user?.uid,
        email: response.user?.email as string,
        name: name,
      });

      await router.push("/");
    } catch (error) {
      // TODO: Handle different types of error (email registered, weak password, no internet connection)
      setError("email", { message: error.message });
    }
  };

  return (
    <Flex
      onSubmit={handleSubmit(submitRegisterForm)}
      as="form"
      direction="column"
      w="100%"
      h="100%"
      gap="5"
      alignItems="center"
    >
      <Heading textAlign="center" color="gray.100">
        Crie sua conta!
      </Heading>

      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Nome</FormLabel>
        <Input
          type="text"
          placeholder="Seu nome"
          {...register("name", {
            required: {
              value: true,
              message: "Digite seu nome",
            },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          placeholder="email@email.com"
          {...register("email", {
            required: {
              value: true,
              message: "Digite seu email",
            },
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
            required: {
              value: true,
              message: "Digite sua senha",
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button variant="solid" type="submit" mt="2">
        Criar conta
      </Button>
    </Flex>
  );
};

export default RegisterForm;
