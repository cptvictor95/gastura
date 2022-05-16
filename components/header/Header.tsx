import { useRouter } from "next/router";
import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const router = useRouter();

  let authState = "LOGGEDIN";

  authState = "LOGGEDOUT";

  return (
    <header className={styles.header}>
      <p>Logo</p>

      <nav className={styles.nav}>
        <button className={styles.navButton} onClick={() => router.push("/")}>
          HOME
        </button>

        {authState === "LOGGEDIN" ? (
          <>
            <button className={styles.navButton}>GASTOS</button>

            <button className={styles.navButton}>ENTRADAS</button>

            <button
              className={styles.exitButton}
              onClick={() => router.push("/")}
            >
              SAIR
            </button>
          </>
        ) : (
          <button
            className={styles.accent}
            onClick={() => router.push("/login")}
          >
            ENTRAR
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
