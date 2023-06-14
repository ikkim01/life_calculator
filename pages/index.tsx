/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import MENU from "../utils/data/MENU";

const indexNumber = 0;

const Index = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <Header title={MENU[indexNumber].heading} />
      <Title title={MENU[indexNumber].heading} />
      <article className="grid-cols-2 w-full grid gap-2 px-3 py-5">
        {MENU.map((menu) => {
          if (menu.key !== 0) {
            return (
              <section key={menu.key}>
                <button
                  className="flex flex-col w-full items-center rounded-lg border"
                  onClick={() => router.push(menu.address)}
                >
                  <div className="w-full h-[150px] bg-mainBlue/20 flex items-center justify-center text-[40px] p-7">
                    <img src={menu.img} alt={menu.explain} />
                  </div>
                  <p className="border-t w-full py-2 text-grey">
                    {menu.heading}
                  </p>
                </button>
              </section>
            );
          }
        })}
      </article>
    </div>
  );
};

export default Index;
