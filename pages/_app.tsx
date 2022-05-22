import "../styles/globals.scss";
import { AppProps } from "next/app";
import { FirebaseProvider } from "config/context";
import { AuthProvider } from "@/contexts/AuthContext";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import { UserProvider } from "@/contexts/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <UserProvider>
          <BudgetProvider>
            <ExpenseProvider>
              <Component {...pageProps} />
            </ExpenseProvider>
          </BudgetProvider>
        </UserProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
