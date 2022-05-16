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
          HOME
        </button>

        {authState === "LOGGEDIN" ? (
          <>
            <button className={styles.navButton}>GASTOS</button>

            <button className={styles.navButton}>ENTRADAS</button>

            <button className={styles.exitButton} onClick={handleUserLogout}>
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
