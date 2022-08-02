import React from "react";

import Head from "next/head";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Flex } from "@chakra-ui/react";

const Main: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  const { user } = useLoggedInUser();
  const firstName = user && user.name.split(" ")[0];

  return (
    <Flex
      as="main"
      height="90vh"
      alignItems="center"
      backgroundImage="https://media.istockphoto.com/id/610767792/pt/foto/little-girl-and-her-smoker-father.webp?s=612x612&w=is&k=20&c=IyjajMwhu3KzzgNCn3Fg0g87tqsKOdB9qqtk-ESuNyY="
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Head>
        <title>{firstName !== null ? `${title} - ${firstName}` : title}</title>
      </Head>
      {children}
    </Flex>
  );
};

export default Main;
