import AuthLoader from "components/Auth/AuthLoader";
import Main from "Layout/Main";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header/Header";
import LoginForm from "../components/LoginForm/LoginForm";
import styles from "../styles/pages/Login.module.scss";

const Login: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <Main title="Login">
        <AuthLoader>
          <LoginForm />

          <section className={styles.createAccountSection}>
            <p>Ainda não tem cadastro?</p>
            <button
              className={styles.link}
              onClick={() => router.push("/register")}
            >
              Criar conta
            </button>
          </section>
        </AuthLoader>
      </Main>
    </>
  );
};

export default Login;
