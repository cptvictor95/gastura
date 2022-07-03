import React from "react";
import styles from "../styles/layout/container.module.scss";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
