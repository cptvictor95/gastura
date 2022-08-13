import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import Main from "Layout/Main";
import Header from "../components/Header/Header";

const Home: React.FC = () => {
  const { authState } = useLoggedInUser();

  return (
    <>
      <Header />
      <Main title="Home">
        {authState === "LOGGEDIN" && (
          <BudgetProvider>
            <ExpenseProvider>
              <Dashboard />
            </ExpenseProvider>
          </BudgetProvider>
        )}
      </Main>
    </>
  );
};

export default Home;
