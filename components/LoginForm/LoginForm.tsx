import { FirebaseCtx } from "config/context";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

export type LoginForm = { email: string; password: string };

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const { auth } = useContext(FirebaseCtx);
  const router = useRouter();

  const submitLogin = (data: LoginForm) => {
    handleLogin(data.email, data.password);

    router.push("/");
  };

  const handleLogin = async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitLogin)}>
      <h2>Login</h2>
      <div className={styles.formControl}>
        <label>email</label>
        <input
          type="email"
          placeholder="email@email.com"
          {...register("email", {
            required: { value: true, message: "Digite o email" },
          })}
        />
        <span className={styles.errorMessage}>
          {errors.email && errors.email.message}
        </span>
      </div>
      <div className={styles.formControl}>
        <label>senha</label>
        <input
          type="password"
          placeholder="******"
          {...register("password", {
            required: { value: true, message: "Digite a senha" },
          })}
        />
        <span className={styles.errorMessage}>
          {errors.password && errors.password.message}
        </span>
      </div>
      <button className={styles.submitButton} type="submit">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
