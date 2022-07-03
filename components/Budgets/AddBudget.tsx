import { BudgetCtx } from "@/contexts/BudgetContext";
import { UserCtx } from "@/contexts/UserContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import useBudgets from "stores/useBudgets";
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
  const { budgets, setBudgets } = useBudgets();
  const [open, setOpen] = useState(false);
  const { createBudget } = useContext(BudgetCtx);
  const { updateUser } = useContext(UserCtx);

  const submitBudgetForm = (data: BudgetForm) => {
    handleCreateBudget({
      name: data.name,
      amount: Number(data.amount),
    });

    closeModal();
  };

  const handleCreateBudget = async (newBudget: Partial<Budget>) => {
    try {
      if (user && typeof budgets !== "boolean") {
        if (budgets.some((budget) => budget.name === newBudget.name)) {
          setError(
            "name",
            {
              message: "Você já tem um orçamento com este nome",
            },
            { shouldFocus: true }
          );
        } else {
          const newBudgetId = await createBudget({
            name: newBudget.name,
            amount: newBudget.amount,
            userId: user.uid,
            expenses: [],
          });

          await updateUser(user.uid, {
            budgets: [...user.budgets, newBudgetId],
          });

          setBudgets([
            ...budgets,
            { uid: newBudgetId, ...newBudget } as Budget,
          ]);
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
      <button onClick={openModal}>Adicionar</button>
      <Popup
        open={open}
        modal
        closeOnEscape
        onClose={closeModal}
        className={styles.popupContent}
      >
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>Novo Orçamento</h3>
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
                    required: {
                      value: true,
                      message: "Digite um valor máximo",
                    },
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
        </div>
      </Popup>
    </>
  );
};

export default AddBudget;
