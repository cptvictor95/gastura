import useLoggedInUser from "@/hooks/useLoggedInUser";
import React from "react";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpense";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const { authState } = useLoggedInUser();
  if (authState === "LOADING") return <>Loading...</>;
  else if (authState === "LOGGEDOUT") return <></>;
  else {
    return (
      <div className={styles.container}>
        <h2>Dashboard</h2>
        <div className={styles.mainColumns}>
          <AddBudget />
          <AddExpense />
        </div>
      </div>
    );
  }
};

export default Dashboard;
