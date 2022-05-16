import React from "react";
import styles from "./styles.module.scss";

const LoginForm: React.FC = () => {
  return (
    <form className={styles.form}>
      <h2>Login</h2>
      <div className={styles.formControl}>
        <label>email</label>
        <input type="email" placeholder="email@email.com" />
      </div>
      <div className={styles.formControl}>
        <label>senha</label>
        <input type="password" placeholder="******" />
      </div>
      <button className={styles.submitButton}>Entrar</button>
    </form>
  );
};

export default LoginForm;
