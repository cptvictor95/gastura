import React, { useContext } from "react";
import { BudgetCtx } from "@/contexts/BudgetContext";
import { useRouter } from "next/router";
import {
  Flex,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
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
      <Flex
        as="form"
        onSubmit={handleSubmit(submitUpdate)}
        direction="column"
        background="green.900"
        p={8}
        borderRadius="7px"
        fontSize="lg"
      >
        <Heading
          textAlign="center"
          mb={8}
          mt="-3"
          fontSize={{ base: 22, md: 30, lg: 30, xl: 30 }}
        >
          Edite sua entrada
        </Heading>

        <FormControl>
          <FormLabel>Entrada</FormLabel>
          <Input {...register("name")} mb={6} />
        </FormControl>

        <FormControl>
          <FormLabel>Valor</FormLabel>
          <Input {...register("amount")} type="number" step="0.01" mb={10} />
        </FormControl>

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
          Atualizar
        </Button>
      </Flex>
    </>
  );
};
export default EditBudgetForm;
