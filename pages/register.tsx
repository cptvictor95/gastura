import AuthLoader from "components/Auth/AuthLoader";
import AuthRedirect from "components/Auth/AuthLoader";
import Header from "components/header/Header";
import RegisterForm from "components/RegisterForm/RegisterForm";
import React from "react";
import styles from "../styles/pages/Register.module.scss";

const Register: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header />
      <AuthLoader>
        <RegisterForm />
      </AuthLoader>
    </main>
  );
};

export default Register;
