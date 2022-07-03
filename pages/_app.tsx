import "../styles/globals.scss";
import { AppProps } from "next/app";
import { FirebaseProvider } from "config/context";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
