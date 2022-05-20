import Dashboard from "@/components/Dashboard/Dashboard";
import Main from "Layout/Main";
import Header from "../components/header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Main title="Home">
        <Dashboard />
      </Main>
    </>
  );
};

export default Home;