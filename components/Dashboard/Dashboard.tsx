import { BudgetCtx } from "@/contexts/BudgetContext";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useEffect, useState } from "react";
import useBudgets from "stores/useBudgets";
import useExpenses from "stores/useExpenses";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpenses/AddExpense";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LoadedText = ({ children }) => (
  <motion.p
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.6 }}
    variants={variants}
  >
    {children}
  </motion.p>
);

const SkeletonText = ({ children }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.6 }}
    variants={variants}
    className={styles.skeletonText}
  >
    {children}
  </motion.div>
);

const Dashboard: React.FC = () => {
  const { authState, user } = useLoggedInUser();
  const { getUserBudgets } = useContext(BudgetCtx);
  const { getUserExpenses } = useContext(ExpenseCtx);
  const [totalBudget, setTotalBudget] = useState<number | false>(false);
  const [totalExpenses, setTotalExpenses] = useState<number | false>(false);
  const [userWallet, setUserWallet] = useState<number | false>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { budgets, setBudgets } = useBudgets();
  const { expenses, setExpenses } = useExpenses();

  const handleUserTotals = async (budgets: Budget[], expenses: Expense[]) => {
    try {
      let totalBudget = 0;
      let totalExpenses = 0;

      budgets.map((budget) => (totalBudget += budget.amount));

      expenses.map((expense) => (totalExpenses += expense.amount));

      setTotalBudget(totalBudget);
      setTotalExpenses(totalExpenses);
      if (expenses) {
        setUserWallet(totalBudget - totalExpenses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (budgets && expenses) {
      handleUserTotals(budgets, expenses);
      setIsLoading(false);
    }
  }, [budgets, expenses]);

  useEffect(() => {
    if (user) {
      const handleGetBudgets = async () => {
        const budgets = await getUserBudgets(user.uid);

        setBudgets(budgets);
      };
      const handleGetExpenses = async () => {
        const expenses = await getUserExpenses(user.uid);

        setExpenses(expenses);
      };

      handleGetBudgets();
      handleGetExpenses();
    }
  }, [user]);

  useEffect(() => {
    if (authState === "LOADING") {
      setIsLoading(true);
    }
  }, [authState]);

  const fixNumber = (hugeNumber: number) => {
    return Number(hugeNumber).toFixed(2);
  };

  return (
    <>
      <div className={styles.balanceContainer}>
        <div className={styles.expense}>
          <div className={styles.card}>
            {isLoading ? (
              <SkeletonText>
                <p>R$00,00</p>
              </SkeletonText>
            ) : (
              <LoadedText>
                R${totalExpenses && fixNumber(totalExpenses)}
              </LoadedText>
            )}
            <p>Total de Gastos</p>
          </div>

          <AddExpense />
        </div>

        <div className={styles.balance}>
          <div className={styles.card}>
            {isLoading ? (
              <SkeletonText>
                <p>R$00,00</p>
              </SkeletonText>
            ) : (
              <LoadedText>R${userWallet && fixNumber(userWallet)}</LoadedText>
            )}
            <p>Carteira</p>
          </div>
        </div>

        <div className={styles.budget}>
          <div className={styles.card}>
            {isLoading ? (
              <SkeletonText>
                <p>R$00,00</p>
              </SkeletonText>
            ) : (
              <LoadedText>R${totalBudget && fixNumber(totalBudget)}</LoadedText>
            )}
            <p>Orçamento total</p>
          </div>

          <AddBudget />
        </div>
      </div>
      <div className={styles.mainColumns}></div>
    </>
  );
};

export default Dashboard;
