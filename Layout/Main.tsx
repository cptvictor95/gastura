import React from "react";
import styles from "../styles/layout/main.module.scss";
import Head from "next/head";

const Main: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>{title && `${title} - `}</title>
      </Head>
      {children}
    </main>
  );
};

export default Main;
