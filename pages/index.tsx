/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Title from "../components/Title";
import MENU from "../utils/data/MENU";

const indexNumber = 0;

const Index = () => {
  const { heading, explain } = MENU[indexNumber];
  const router = useRouter();

  return (
    <main className="flex flex-col items-center">
      <Header title={heading} explain={explain} />
      <Title title={heading} />
      <article className="grid-cols-2 w-full grid gap-2 px-3 py-5">
        {MENU.map((menu) => {
          if (menu.key !== 0) {
            return (
              <section key={menu.key}>
                <button
                  className="flex flex-col w-full items-center rounded-lg border border-mainBlue "
                  onClick={() => router.push(menu.address)}
                >
                  <div className="w-full h-[150px] bg-mainBlue/30 flex items-center justify-center text-[40px] p-7 rounded-t-lg">
                    <Image
                      src={menu.img}
                      alt={menu.heading}
                      width={150}
                      height={150}
                      priority={true}
                    />
                  </div>
                  <p className="border-t w-full py-2 text-grey rounded-b-lg border-mainBlue">
                    {menu.heading}
                  </p>
                </button>
              </section>
            );
          }
        })}
      </article>
    </main>
  );
};

export default Index;
