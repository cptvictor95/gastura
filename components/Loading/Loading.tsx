import React from "react";
import { Oval } from "react-loader-spinner";

const Loading: React.FC = () => {
  return (
    <Oval color="grey" secondaryColor="transparent" strokeWidthSecondary={4} />
  );
};

export default Loading;
