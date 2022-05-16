import { useRouter } from "next/router";
import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <p>Logo</p> 

      <nav className={styles.nav}>
        <button 
          className={styles.navButton} 
          onClick={() => router.push("/")}>
          HOME
        </button>

        <button
          className={styles.navButton}
          onClick={() => router.push("/login")}>
          GASTOS
        </button>

        <button
          className={styles.navButton}
          onClick={() => router.push("/login")}>
          ENTRADAS
        </button>

        <button
          className={styles.exitButton}
          onClick={() => router.push("/login")}>
          SAIR
        </button>
      </nav>
    </header>
  );
};

export default Header;
