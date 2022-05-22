import React from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";

const AddExpense: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      description: "",
      amount: null,
      budget: "",
    },
  });
  const budgets = ["Alimentação", "Gasolina", "Farmácia"];

  const submitBudgetForm = (data) => console.log("data", data);

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
          <label htmlFor="budget">Categoria</label>
          <select
            id="budget"
            {...register("budget", {
              required: { value: true, message: "Escolha uma categoria" },
            })}
          >
            <option value="" disabled>
              Categoria do Gasto
            </option>
            {budgets.map((budget) => (
              <option value={budget} key={budget}>
                {budget[0].toUpperCase() + budget.slice(1)}
              </option>
            ))}
          </select>
          <span className={styles.errorMessage}>
            {errors.budget && errors.budget.message}
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
