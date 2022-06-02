import { UserProvider } from "@/contexts/UserContext";
import AuthLoader from "components/Auth/AuthLoader";
import Header from "@/components/Header/Header";
import RegisterForm from "components/RegisterForm/RegisterForm";
import Main from "Layout/Main";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/pages/Register.module.scss";

const Register: React.FC = () => {
  const router = useRouter();
  return (
    <UserProvider>
      <>
        <Header />
        <Main title="Cadastrar">
          <AuthLoader>
            <RegisterForm />

            <section className={styles.loginSection}>
              <p>Já tem uma conta?</p>
              <button
                className={styles.link}
                onClick={() => router.push("/register")}
              >
                Fazer login
              </button>
            </section>
          </AuthLoader>
        </Main>
      </>
    </UserProvider>
  );
};

export default Register;
