import Dashboard from "@/components/Dashboard/Dashboard";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import Main from "Layout/Main";
import Header from "../components/Header/Header";

const Home: React.FC = () => {
  const { authState } = useLoggedInUser();

  return (
    <>
      <Header />
      <Main title="Home">{authState === "LOGGEDIN" && <Dashboard />}</Main>
    </>
  );
};

export default Home;
