import "../styles/globals.scss";
import { AppProps } from "next/app";
import { FirebaseProvider } from "config/context";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { ExpenseProvider } from "@/contexts/ExpenseContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <BudgetProvider>
          <ExpenseProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </ExpenseProvider>
        </BudgetProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
