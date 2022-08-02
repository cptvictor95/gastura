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
      minHeight="90vh"
      alignItems="center"
      backgroundImage="https://img.r7.com/images/2016/03/16/4b0yflv637_22y37gtes1_file.jpg"
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
