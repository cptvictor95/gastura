import "../styles/globals.scss";
import { AppProps } from "next/app";
import { FirebaseProvider } from "config/context";
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
