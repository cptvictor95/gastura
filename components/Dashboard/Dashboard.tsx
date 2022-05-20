import useLoggedInUser from "@/hooks/useLoggedInUser";
import React from "react";
import AddBudget from "../Budgets/AddBudget";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const { authState } = useLoggedInUser();
  if (authState === "LOADING") return <>Loading...</>;
  else if (authState === "LOGGEDOUT") return <></>;
  else {
    return (
      <div className={styles.container}>
        <h2>Dashboard</h2>
        <AddBudget />
      </div>
    );
  }
};

export default Dashboard;
