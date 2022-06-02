import { AuthCtx } from "@/contexts/AuthContext";
import { emailRegEx } from "@/utils/regEx";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

export type LoginForm = { email: string; password: string };

const LoginForm: React.FC = () => {
  const { login } = useContext(AuthCtx);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const router = useRouter();

  const submitLoginForm = (data: LoginForm) => {
    handleLogin(data.email, data.password);
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    await router.push("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitLoginForm)}>
      <h2>Login</h2>
      <div className={styles.formControl}>
        <label htmlFor="email">Email</label>
        <input
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
        <span className={styles.errorMessage}>
          {errors.email && errors.email.message}
        </span>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder="******"
          {...register("password", {
            required: { value: true, message: "Digite sua senha" },
          })}
        />
        <span className={styles.errorMessage}>
          {errors.password && errors.password.message}
        </span>
      </div>
      <button type="submit" className={styles.submitButton}>
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
