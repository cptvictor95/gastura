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
    <Flex as="main" height="90vh" alignItems="center">
      <Head>
        <title>{firstName !== null ? `${title} - ${firstName}` : title}</title>
      </Head>
      {children}
    </Flex>
  );
};

export default Main;
