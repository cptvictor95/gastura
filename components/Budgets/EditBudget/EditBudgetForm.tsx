import { BudgetCtx } from "@/contexts/BudgetContext";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

const EditBudgetForm = ({ budget }) => {
  const { updateBudget } = useContext(BudgetCtx);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: budget.name,
      amount: budget.amount,
    },
  });

  const submitUpdate = async (data) => {
    try {
      await updateBudget(budget.uid, {
        ...budget,
        name: data.name,
        amount: data.amount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitUpdate)} className={styles.form}>
      <input {...register("name")} />
      <input {...register("amount")} />
      <button type="submit">Send</button>
    </form>
  );
};
export default EditBudgetForm;
