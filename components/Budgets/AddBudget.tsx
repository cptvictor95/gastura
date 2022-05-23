import { BudgetCtx } from "@/contexts/BudgetContext";
import { UserCtx } from "@/contexts/UserContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Budget } from "types/Budget";
import styles from "./styles.module.scss";

type BudgetForm = {
  name: string;
  amount: number;
};
const AddBudget: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BudgetForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      amount: null,
    },
  });
  const { user } = useLoggedInUser();

  const { createBudget, getUserBudgets } = useContext(BudgetCtx);
  const { updateUser } = useContext(UserCtx);

  const submitExpenseForm = (data: BudgetForm) => {
    handleCreateBudget({
      name: data.name,
      amount: Number(data.amount),
    });
  };

  const handleCreateBudget = async (newBudget: Partial<Budget>) => {
    try {
      if (user) {
        const budgets = await getUserBudgets(user.uid);

        if (budgets.some((budget) => budget.name === newBudget.name)) {
          setError(
            "name",
            {
              message: "Você já tem um orçamento com este nome",
            },
            { shouldFocus: true }
          );
        } else {
          const budgetId = await createBudget({
            name: newBudget.name,
            amount: newBudget.amount,
            userId: user.uid,
          });

          await handleUpdateUser(budgetId, user);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (budgetId, user) => {
    try {
      if (budgetId) {
        await updateUser(user.uid, {
          budgets: { ...user.budgets, [budgetId]: true },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(submitExpenseForm)}>
        <div className={styles.formControl}>
          <label htmlFor="name">Nome</label>
          <input
            {...register("name", {
              required: { value: true, message: "Digite uma descrição" },
            })}
            placeholder="Ex.: Alimentação"
            type="text"
          />
          <span className={styles.errorMessage}>
            {errors.name && errors.name.message}
          </span>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="amount">Valor Máximo</label>
          <input
            type="number"
            step={0.01}
            min={0}
            placeholder="R$00,00"
            {...register("amount", {
              required: { value: true, message: "Digite um valor máximo" },
            })}
          />
          <span className={styles.errorMessage}>
            {errors.amount && errors.amount.message}
          </span>
        </div>
        <button type="submit" className={styles.submitButton}>
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default AddBudget;
