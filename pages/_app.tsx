import "../styles/globals.scss";
import { AppProps } from "next/app";
import { FirebaseProvider } from "config/context";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <FirebaseProvider>
        <AuthProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </AuthProvider>
      </FirebaseProvider>
    </ChakraProvider>
  );
}

export default MyApp;
