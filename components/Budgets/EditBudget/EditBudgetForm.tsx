import { BudgetCtx } from "@/contexts/BudgetContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

const EditBudgetForm = ({ budget }) => {
  const router = useRouter();

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
    await router.push("/budgets");
  };

  return (
    <>
      <h2 className={styles.h2}>Edite seu orçamento</h2>
      <form onSubmit={handleSubmit(submitUpdate)} className={styles.form}>
        <div className={styles.entrada}>Entrada</div>
        <input className={styles.inputN} {...register("name")} />
        <div className={styles.valor}>Valor</div>
        <input className={styles.inputV} {...register("amount")} />
        <button className={styles.button} type="submit">
          Alterar
        </button>
      </form>
    </>
  );
};
export default EditBudgetForm;
