import React from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";

const AddExpense = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      amount: null,
    },
  });

  const submitExpenseForm = (data) => console.log("data", data);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(submitExpenseForm)}>
        <h3>Adicionar orcamento</h3>
        <div className={styles.formControl}>
          <label htmlFor="name">Nome do orcamento</label>
          <input
            {...register("name", {
              required: { value: true, message: "Digite uma descrição" },
            })}
            placeholder="Categoria de gasto"
            type="text"
          />
          <span className={styles.errorMessage}>
            {errors.name && errors.name.message}
          </span>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="amount">Valor</label>
          <input
            {...register("amount", {
              required: { value: true, message: "Digite um valor" },
            })}
            type="number"
            step={0.01}
            placeholder="R$00,00"
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

export default AddExpense;
