/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";
import MENU from "../utils/data/MENU";
import useFavoriteTab from "../utils/zustand/useFavoriteTab";
import { copyUrl } from "../components/Function";

const indexNumber = 0;

const Index = () => {
  const { name, explain } = MENU[indexNumber];
  const { favoriteTab, handleFavoriteTab } = useFavoriteTab();

  const [cardModal, setCardModal] = useState<{
    name: string;
    section: null | HTMLElement;
  }>({
    name: "",
    section: null,
  });
  const router = useRouter();

  useEffect(() => {
    const listener = (
      event: React.BaseSyntheticEvent | MouseEvent | TouchEvent
    ) => {
      if (!cardModal.section || cardModal.section.contains(event.target)) {
        return;
      }
      setCardModal({
        name: "",
        section: null,
      });
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [cardModal.section]);

  const handleCardModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, parentElement } = event.currentTarget;

    cardModal.name === name
      ? setCardModal({
          name: "",
          section: null,
        })
      : setCardModal({
          name: name,
          section: parentElement,
        });
  };

  const handleFavoriteTabIndex = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { name } = event.currentTarget;

    handleFavoriteTab(name);
  };

  return (
    <main className="flex items-center flex-col w-full">
      <Header title={name} explain={explain} />
      <div className="flex flex-col space-y-10 py-5 mobile:w-full smallPc:min-w-full pc:min-w-full pc:pt-[93.5px]">
        {MENU.map((menu) => {
          if (menu.key !== "HOME") {
            return (
              <div key={menu.key} className="flex flex-col space-y-3">
                <h2 className="flex space-x-2 items-center pc:px-10 mobile:px-[15vw] smallPc:px-14 smallPc: pc:py-10 pc:text-[33px] mobile:py-2 mobile:text-[25px] smallPc:py-4">
                  <Image
                    src={menu.img}
                    alt={menu.explain}
                    width={35}
                    height={35}
                    priority={true}
                  />
                  <p>{menu.name}</p>
                </h2>
                <article className="grid-cols-indexCard w-full grid gap-5 px-10 place-items-center">
                  {menu.childMenu.map((child) => {
                    return (
                      <section
                        key={child.key}
                        className="relative flex max-w-[350px] pc:hover:translate-y-[5px] pc:transition-all pac:duration-50"
                      >
                        <button
                          className={`flex flex-col w-full items-center rounded-lg border shadow-lg`}
                          name={child.heading}
                          onClick={() =>
                            cardModal.name !== child.heading &&
                            router.push(child.address)
                          }
                        >
                          <div className="w-full min-h-[210px] bg-mainBlue/30 flex items-center justify-center text-[40px] p-7 rounded-t-lg">
                            <Image
                              src={child.img}
                              alt={child.heading}
                              width={100}
                              height={100}
                              priority={true}
                            />
                          </div>
                          <h3 className="border-t min-w-[240px] -w-full py-5 text-grey rounded-b-lg text-[20px] text-start px-6">
                            {child.heading}
                          </h3>
                        </button>
                        <div
                          className={`w-full h-full absolute top-0 ${
                            cardModal.name === child.heading
                              ? "opacity-1 z-[0]"
                              : "opacity-0 z-[-1]"
                          } bg-black/50 rounded-lg transition-[opacity] duration-150`}
                        >
                          <ul>
                            <li>
                              <button
                                className="rounded-full bg-[#eee] w-[40px] h-[40px] flex items-center justify-center absolute right-[18px] bottom-[80px]"
                                name={String(child.key)}
                                id={"addFavorite" + String(child.key)}
                                area-label="addFavorite"
                                onClick={handleFavoriteTabIndex}
                              >
                                <p className="opacity-0 absolute h-0">
                                  즐겨찾기추가
                                </p>
                                <svg
                                  width="27px"
                                  height="27px"
                                  viewBox="0 0 24 24"
                                  fill={
                                    favoriteTab.includes(String(child.key))
                                      ? "#000"
                                      : "none"
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
                                    stroke={
                                      favoriteTab.includes(String(child.key))
                                        ? "#000"
                                        : "#041C32"
                                    }
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </li>
                            <li>
                              <button
                                className={`rounded-full bg-[#eee] w-[40px] h-[40px] flex items-center justify-center absolute right-[18px] transition-transform duration-150 bottom-[80px] ${
                                  cardModal.name === child.heading
                                    ? "translate-y-[-54px]"
                                    : "translate-y-0"
                                }`}
                                name="copyUrl"
                                onClick={() => copyUrl(child.address)}
                              >
                                <Image
                                  src="/img/urlIcon.svg"
                                  alt="copyUrl"
                                  width={27}
                                  height={27}
                                  priority={true}
                                />
                              </button>
                            </li>
                          </ul>
                          <button
                            className={`absolute right-4 bottom-[23px] ${
                              cardModal.name === child.heading
                                ? "opacity-1"
                                : "opacity-0"
                            } transition-[opacity] duration-150`}
                            onClick={handleCardModal}
                            name={child.heading}
                          >
                            <Image
                              src="/img/closeIcon.svg"
                              alt="closeCardModal"
                              width={27}
                              height={27}
                              priority={true}
                            />
                          </button>
                        </div>
                        {cardModal.name !== child.heading && (
                          <button
                            className="absolute right-4 bottom-[23px]"
                            onClick={handleCardModal}
                            name={child.heading}
                            id={menu.key + String(child.key)}
                          >
                            <Image
                              src="/img/dot3Icon.svg"
                              alt="openMenu"
                              width={27}
                              height={27}
                              priority={true}
                            />
                          </button>
                        )}
                      </section>
                    );
                  })}
                </article>
              </div>
            );
          }
        })}
      </div>
    </main>
  );
};

export default Index;
