import useLoggedInUser from "hooks/useLoggedInUser";
import { useRouter } from "next/router";
import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const { authState, handleUserLogout } = useLoggedInUser();

  return (
    <header className={styles.header}>
      <p>Logo</p>

      <nav className={styles.nav}>
        <button className={styles.navButton} onClick={() => router.push("/")}>
          Home
        </button>

        {authState === "LOGGEDIN" ? (
          <>
            <button className={styles.navButton}>Gastos</button>

            <button className={styles.navButton}>Entradas</button>

            <button className={styles.exitButton} onClick={handleUserLogout}>
              Sair
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
