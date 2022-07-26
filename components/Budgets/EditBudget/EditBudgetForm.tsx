import { BudgetCtx } from "@/contexts/BudgetContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import {
  Flex,
  Button,
  Input,
  Heading,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

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
        amount: Number(data.amount),
      });
    } catch (error) {
      console.log(error);
    }
    await router.push("/budgets");
  };

  return (
    <>
      <Flex height="90vh" alignItems="center" justifyContent="center" mt="-28">
        <Flex
          direction="column"
          background="green.900"
          p={12}
          borderRadius="7px"
          fontSize="lg"
          width="42%"
        >
          <Heading mb={6} fontSize="28">
            Edite sua entrada
          </Heading>
          <FormControl onSubmit={handleSubmit(submitUpdate)}>
            <Text>Entrada</Text>
            <Input {...register("name")} mb={6} />
            <Text>Valor</Text>
            <Input {...register("amount")} type="number" step="0.01" mb={10} />
            <Button
              type="submit"
              _hover={{
                filter: "auto",
                brightness: "90%",
              }}
              color="black"
              background="gray.100"
              width="100%"
              fontSize="lg"
            >
              Alterar
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};
export default EditBudgetForm;
