import useLoggedInUser from "hooks/useLoggedInUser";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, authState, handleUserLogout } = useLoggedInUser();

  return (
    <header className={styles.header}>
      <p>Logo</p>

      {authState === "LOADING" ? (
        <></>
      ) : user ? (
        <nav className={styles.nav}>
          <button className={styles.navButton} onClick={() => router.push("/")}>
            Home
          </button>
          <button
            className={styles.navButton}
            onClick={() => router.push("/expenses")}
          >
            Gastos
          </button>

          <button
            className={styles.navButton}
            onClick={() => router.push("/budgets")}
          >
            Entradas
          </button>

          <button className={styles.exitButton} onClick={handleUserLogout}>
            Sair
          </button>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <button className={styles.navButton} onClick={() => router.push("/")}>
            Home
          </button>
          <button
            className={styles.accent}
            onClick={() => router.push("/login")}
          >
            Entrar
          </button>
          <button
            className={styles.accent}
            onClick={() => router.push("/register")}
          >
            Criar conta
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
