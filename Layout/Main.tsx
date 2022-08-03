import React from "react";

import Head from "next/head";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Flex, Image } from "@chakra-ui/react";

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

      //alignItems="center"
    >
      <Head>
        <title>{firstName !== null ? `${title} - ${firstName}` : title}</title>
      </Head>
      <Image
        position="absolute"
        padding="4"
        bottom="0"
        right="0"
        maxH="80vh"
        overflowY="hidden"
        objectFit="cover"
        src="./assets/Group.svg"
        zIndex="-1"
        alt="backgroundImage"
      />
      {children}
    </Flex>
  );
};

export default Main;
