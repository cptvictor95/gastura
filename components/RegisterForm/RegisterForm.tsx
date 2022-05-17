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

type User = {
  uid: string;
  name: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const { auth, firestore } = useContext(FirebaseCtx);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormProps>();
  const router = useRouter();

  const submitRegisterForm = (data: RegisterFormProps) => {
    console.log("data", data);

    handleRegister(data);

    router.push("/");
  };

  // Creates a new user on firebase authentication
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

      const userId = await createUser({
        uid: response.user?.uid,
        email: response.user?.email as string,
        name: name,
      });

      return userId;
    } catch (error: any) {
      console.error(error);
      // TODO: Handle different types of error (email registered, weak password, no internet connection)
      setError("email", { message: error.message });
    }
  };

  // Creates a new user on firestore database
  // TODO: Move this function to actions context
  const createUser = async (user: Partial<User>) => {
    try {
      const userRef = firestore.collection("users").doc(user.uid);

      const userId = userRef.id;

      await userRef.set(user);

      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitRegisterForm)}>
      <h2>Criar conta</h2>
      <div>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          placeholder=""
          {...register("name", {
            required: {
              value: true,
              message: "Digite seu nome",
            },
          })}
        />
        <span>{errors.name && errors.name.message}</span>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder=""
          {...register("email", {
            required: {
              value: true,
              message: "Digite seu email",
            },
          })}
        />
        <span>{errors.email && errors.email.message}</span>
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder=""
          {...register("password", {
            required: {
              value: true,
              message: "Digite sua senha",
            },
          })}
        />
        <span>{errors.password && errors.password.message}</span>
      </div>

      <button type="submit">Criar conta</button>
    </form>
  );
};

export default RegisterForm;
