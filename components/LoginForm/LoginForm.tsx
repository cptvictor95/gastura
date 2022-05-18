import AuthLoader from "components/Auth/AuthLoader";
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

  const submitLoginForm = (data: LoginForm) => {
    handleLogin(data.email, data.password);

    router.push("/");
  };

  const handleLogin = async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  return (
    <AuthLoader>
      <form className={styles.form} onSubmit={handleSubmit(submitLoginForm)}>
        <h2>Login</h2>
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email@email.com"
            {...register("email", {
              required: { value: true, message: "Digite seu email" },
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
        <button className={styles.submitButton} type="submit">
          Entrar
        </button>
      </form>
    </AuthLoader>
  );
};

export default LoginForm;
