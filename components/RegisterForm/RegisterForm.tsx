import { UserCtx } from "@/contexts/UserContext";
import { FirebaseCtx } from "config/context";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";

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
    console.log("data", data);

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
    } catch (error: any) {
      console.error(error);
      // TODO: Handle different types of error (email registered, weak password, no internet connection)
      setError("email", { message: error.message });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitRegisterForm)}>
      <h2>Criar conta</h2>
      <div className={styles.formControl}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          placeholder="Seu nome"
          {...register("name", {
            required: {
              value: true,
              message: "Digite seu nome",
            },
          })}
        />
        <span>{errors.name && errors.name.message}</span>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email@email.com"
          {...register("email", {
            required: {
              value: true,
              message: "Digite seu email",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email inválido",
            },
          })}
        />
        <span>{errors.email && errors.email.message}</span>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder="******"
          {...register("password", {
            required: {
              value: true,
              message: "Digite sua senha",
            },
          })}
        />
        <span>{errors.password && errors.password.message}</span>
      </div>

      <button type="submit" className={styles.submitButton}>
        Criar conta
      </button>
    </form>
  );
};

export default RegisterForm;
