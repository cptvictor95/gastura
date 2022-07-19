import { ExpenseCtx } from "@/contexts/ExpenseContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Expense } from "types/Expense";
import styles from "./styles.module.scss";

interface EditExpenseType {
  description: string;
  amount: number;
}
const EditExpenseForm: React.FC<{ expense: Expense }> = ({ expense }) => {
  const router = useRouter();
  const { updateExpense } = useContext(ExpenseCtx);
  const { register, handleSubmit } = useForm<EditExpenseType>({
    defaultValues: {
      description: expense.description,
      amount: expense.amount,
    },
  });

  const submitUpdate = async (data: EditExpenseType) => {
    try {
      console.log(data);
      await updateExpense(expense.uid, {
        ...expense,
        description: data.description,
        amount: Number(data.amount),
      });
    } catch (error) {
      console.log(error);
    }
    await router.push("/expenses");
  };

  return (
    <>
      <h2 className={styles.h2}>Edite seu gasto</h2>
      <form className={styles.form} onSubmit={handleSubmit(submitUpdate)}>
        <div className={styles.formControl}>
          <label className={styles.label}>Gasto</label>
          <input className={styles.input} {...register("description")} />
        </div>
        <div className={styles.formControl}>
          <label className={styles.label}>Valor</label>
          <input
            className={styles.input}
            {...register("amount")}
            type="number"
            step="0.01"
          />
        </div>
        <button className={styles.button} type="submit">
          Alterar
        </button>
      </form>
    </>
  );
};
export default EditExpenseForm;
