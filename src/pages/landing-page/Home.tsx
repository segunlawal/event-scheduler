import React from "react";

import TopNav from "../../components/TopNav";
import { Intro } from "./Intro";
import "../../../src/App.css";

export const Home = (): JSX.Element => {
  return (
    <div className="">
      <TopNav />
      <Intro />
      <p className="py-10 text-center">Next section</p>
    </div>
  );
};
