import React from "react";
import useLoggedInUser from "hooks/useLoggedInUser";
import { useRouter } from "next/router";

const AuthLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState } = useLoggedInUser();
  const router = useRouter();

  if (authState === "LOGGEDIN") {
    router.push("/");
    return <></>;
  } else
    return (
      <>
        {authState === "LOADING" ? (
          <>LOADING...</>
        ) : authState === "LOGGEDOUT" ? (
          <>{children}</>
        ) : (
          <></>
        )}
      </>
    );
};

export default AuthLoader;
