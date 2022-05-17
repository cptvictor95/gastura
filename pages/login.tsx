import AuthLoader from "components/Auth/AuthLoader";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/header/Header";
import LoginForm from "../components/LoginForm/LoginForm";
import styles from "../styles/pages/Login.module.scss";

const Login: React.FC = () => {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <Header />
      <AuthLoader>
        <LoginForm />

        <section className={styles.createAccountSection}>
          <p>Ainda não tem cadastro?</p>
          <button onClick={() => router.push("/register")}>Criar conta</button>
        </section>
      </AuthLoader>
    </main>
  );
};

export default Login;
