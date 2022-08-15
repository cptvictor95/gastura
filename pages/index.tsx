import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import Main from "Layout/Main";
import Header from "../components/Header/Header";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { authState } = useLoggedInUser();

  return (
    <>
      <BudgetProvider>
        <ExpenseProvider>
          <Header />
          <Main title="Home">{authState === "LOGGEDIN" && <Dashboard />}</Main>
        </ExpenseProvider>
      </BudgetProvider>
    </>
  );
};

export default Home;
