import "../styles/globals.scss";
import { AppProps } from "next/app";
import { FirebaseProvider } from "config/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
