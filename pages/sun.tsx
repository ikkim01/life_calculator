import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import MENU from "../utils/data/MENU";

const indexNumber = 3;

const Sun = () => {
  const { heading, explain } = MENU[indexNumber];

  return (
    <main className="flex flex-col items-center">
      <Header title={heading} explain={explain} />
      <Title title={heading} />
    </main>
  );
};

export default Sun;
