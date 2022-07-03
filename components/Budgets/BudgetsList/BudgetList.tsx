import React, { useEffect, useState, useContext } from "react";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Budget } from "types/Budget";
import { BudgetCtx } from "@/contexts/BudgetContext";
import Expenses from "pages/expenses";
import ListItem from "./ListItem/ListItem";
import styles from "./styles.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import Loading from "@/components/Loading/Loading";
/**
 * @todo use budget context
 * @todo create handler for getBudgets
 * @todo add budget list to state
 * @todo map budget list from state on html
 * @todo use listItem component on map return
 */
const BudgetList: React.FC = () => {
  const { getUserBudgets } = useContext(BudgetCtx);
  const { user } = useLoggedInUser();
  console.log(user);
  const [budget, setBudget] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetUserBudget = async (userId: string) => {
    const budget = await getUserBudgets(userId);

    setBudget(budget);
    setIsLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    if (user !== null && user !== false && mounted)
      handleGetUserBudget(user.uid);
    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th>#</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Opção</th>
          </tr>
        </thead>
        {isLoading ? (
          <tbody className={styles.loadingContainer}>
            <Loading />
          </tbody>
        ) : (
          budget.map((budget, index) => {
            return <ListItem budget={budget} key={budget.uid} index={index} />;
          })
        )}
      </table>
    </div>
  );
};

export default BudgetList;
