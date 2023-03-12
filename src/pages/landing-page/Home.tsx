import TopNav from "../../components/TopNav";
import { Intro } from "./Intro";
import "../../../src/App.css";

export const Home = (): JSX.Element => {
  return (
    <div className="">
      <TopNav />
      <Intro />
    </div>
  );
};
