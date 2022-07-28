import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { BudgetCtx } from "@/contexts/BudgetContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Expense } from "types/Expense";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useBudgets from "stores/useBudgets";
import useExpenses from "stores/useExpenses";
import Popup from "reactjs-popup";
import { Button } from "@chakra-ui/react";

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
  const [open, setOpen] = useState(false);

  const submitBudgetForm = (data: ExpenseForm) => {
    handleCreateExpense({
      description: data.description,
      amount: Number(data.amount),
      budgetId: data.budgetId,
      createdAt: Date.now(),
    });

    closeModal();
  };

  const handleCreateExpense = async (newExpense: Expense) => {
    try {
      if (user && typeof expenses !== "boolean") {
        const newExpenseId = await createExpense(newExpense);
        const budget = await getBudgetById(newExpense.budgetId);

        if (newExpenseId && budget) {
          await updateBudget(newExpense.budgetId, {
            expenses: [...budget.expenses, newExpenseId],
          });

          setExpenses([...expenses, { uid: newExpenseId, ...newExpense }]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>Adicionar</Button>
      <Popup open={open} modal closeOnEscape onClose={closeModal}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>Novo Gasto</h3>
            <button className={styles.closeBtn} onClick={closeModal}>
              &times;
            </button>
          </div>

          <div className={styles.formContainer}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(submitBudgetForm)}
            >
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
                  {typeof budgets !== "boolean" &&
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

              <Button type="submit" className={styles.submitButton}>
                Adicionar
              </Button>
            </form>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default AddExpense;
