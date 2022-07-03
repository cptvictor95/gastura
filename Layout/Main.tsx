import React from "react";
import styles from "../styles/layout/main.module.scss";
import Head from "next/head";
import useLoggedInUser from "@/hooks/useLoggedInUser";

const Main: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  const { user } = useLoggedInUser();
  const firstName = user && user.name.split(" ")[0];

  return (
    <main className={styles.main}>
      <Head>
        <title>{firstName !== null ? `${title} - ${firstName}` : title}</title>
      </Head>
      {children}
    </main>
  );
};

export default Main;
