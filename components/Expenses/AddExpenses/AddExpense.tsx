import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { BudgetCtx } from "@/contexts/BudgetContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import { useRouter } from "next/router";
import useBudgets from "stores/useBudgets";
import useExpenses from "stores/useExpenses";

type ExpenseForm = {
  uid?: string;
  description: string;
  amount: number;
  budgetId: string;
};

const AddExpense: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseForm>({
    mode: "onChange",
    defaultValues: {
      description: "",
      amount: null,
      budgetId: "",
    },
  });
  const { user } = useLoggedInUser();
  const { updateBudget, getBudgetById } = useContext(BudgetCtx);
  const { createExpense } = useContext(ExpenseCtx);
  const { budgets } = useBudgets();
  const { expenses, setExpenses } = useExpenses();

  const submitBudgetForm = (data: ExpenseForm) => {
    handleCreateExpense({
      description: data.description,
      amount: Number(data.amount),
      budgetId: data.budgetId,
      createdAt: Date.now(),
    });
  };

  const handleCreateExpense = async (newExpense: Expense) => {
    try {
      if (user) {
        const newExpenseId = await createExpense(newExpense);
        const budget = await getBudgetById(newExpense.budgetId);

        if (newExpenseId && budget) {
          await updateBudget(newExpense.budgetId, {
            expenses: { ...budget.expenses, [newExpenseId]: true },
          });

          setExpenses([...expenses, { uid: newExpenseId, ...newExpense }]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(submitBudgetForm)}>
        <div className={styles.formControl}>
          <label htmlFor="description">Descrição</label>
          <input
            placeholder="Ex.: Belle Lanches"
            {...register("description", {
              required: { value: true, message: "Digite uma descrição" },
            })}
          />
          <span className={styles.errorMessage}>
            {errors.description && errors.description.message}
          </span>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="amount">Valor do gasto</label>
          <input
            placeholder="R$00,00"
            type="number"
            step={0.01}
            min={0}
            {...register("amount", {
              required: { value: true, message: "Digite um valor" },
            })}
          />
          <span className={styles.errorMessage}>
            {errors.amount && errors.amount.message}
          </span>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="budgetId">Categoria</label>
          <select
            id="budgetId"
            {...register("budgetId", {
              required: { value: true, message: "Escolha uma categoria" },
            })}
          >
            <option value="" disabled>
              Categoria do Gasto
            </option>
            {budgets &&
              budgets.map((budget) => (
                <option value={budget.uid} key={budget.uid}>
                  {budget.name[0].toUpperCase() + budget.name.slice(1)}
                </option>
              ))}
          </select>
          <span className={styles.errorMessage}>
            {errors.budgetId && errors.budgetId.message}
          </span>
        </div>

        <button type="submit" className={styles.submitButton}>
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
