import { useRouter } from "next/router";
import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <p>Logo</p>

      <nav>
        <button className={styles.navButton} onClick={() => router.push("/")}>
          home
        </button>
        <button
          className={styles.navButton}
          onClick={() => router.push("/login")}
        >
          login
        </button>
      </nav>
    </header>
  );
};

export default Header;
