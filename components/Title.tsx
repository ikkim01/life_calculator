import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import MENU from "../utils/data/MENU";
import useFavoriteTab from "../utils/zustand/useFavoriteTab";
import useHandleMenu from "../utils/zustand/useHandleMenu";
import usePcNav from "../utils/zustand/usePcNav";

interface propsType {
  title: string;
}

const Title = ({ title }: propsType) => {
  const { navMenu, setMenuNone, handlePcMenu } = usePcNav();
  const { menu, handleMenu } = useHandleMenu();
  const { favoriteTab, handleFavoriteTab } = useFavoriteTab();
  const router = useRouter();

  useEffect(() => {
    const listener = (
      event: React.BaseSyntheticEvent | MouseEvent | TouchEvent
    ) => {
      if (!navMenu.section || navMenu.section.contains(event.target)) {
        return;
      }
      setMenuNone();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [navMenu.section, setMenuNone]);

  const changeRouting = (address: string) => {
    setMenuNone();
    let addressArr = [];

    MENU.map((menu) =>
      menu.childMenu.map((child) => {
        addressArr.push(child.address);
      })
    );
    const currentAddress = router.asPath;

    if (addressArr.includes(currentAddress)) {
      router.push(address);
    } else {
      router.replace(address);
    }
  };

  console.log(navMenu);
  return (
    <header className="flex justify-center items-center h-[93.5px] border-b text-[35px] text-grey bg-fourthYellow w-full mobile:px-5 px-[5vw] relative z-[4] pc:fixed">
      <button onClick={() => router.push("/")} className="absolute left-[5vw]">
        <Image
          src="/img/homeIcon.svg"
          alt="goHome"
          width={40}
          height={50}
          priority={true}
        />
      </button>
      <h1 className="pc:hidden">{title}</h1>
      <nav className="mobile:hidden smallPc:hidden h-full flex ">
        <ul className="flex space-x-10 font-[300] h-full hover:text-gray-500">
          {MENU.map((menu) => {
            if (menu.key !== "HOME") {
              return (
                <li
                  key={menu.key}
                  className="h-full flex items-center hover:text-black w-[120px] select-none"
                >
                  <button
                    name={menu.key}
                    onClick={handlePcMenu}
                    className="w-full"
                  >
                    {menu.name}
                  </button>
                  {navMenu.name === menu.key && (
                    <ul className="absolute top-[80px] text-[25px] flex w-fit px-5 bg-black rounded-full space-x-4">
                      {menu.key !== "HOME" &&
                        menu.childMenu.map((child) => (
                          <li
                            key={child.key}
                            className="text-white non-hover-bold hover:font-bold cursor-pointer"
                            title={child.heading}
                          >
                            <button
                              name={child.key}
                              onClick={() => changeRouting(child.address)}
                            >
                              {child.heading}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              );
            }
          })}
          {/* <li className="cursor-pointer h-full flex items-center hover:text-black">
            <button name="FAVORITE" onClick={handleMenu}>
              즐겨찾기
            </button>
{favoriteTab.length !== 0 ? (
        favoriteTab.map((favorite) => {
          const findMenu = MENU.find((menu) =>
            menu.childMenu.find((child) => child.key === favorite)
          );
          const menuIndex = findMenu?.childMenu.findIndex(
            (child) => child.key === favorite
          );

          const data = findMenu.childMenu[menuIndex];

          return (
            <article
              key={data.key}
              className="border w-full rounded-lg relative flex items-center"
            >
              <button
                className="w-full text-start h-full px-5 py-3 text-grey rounded-lg bg-white"
                onClick={() => changeRouting(data.address)}
              >
                {data.heading}
              </button>
              <button
                className="absolute right-5"
                onClick={handleFavoriteTabIndex}
                name={String(data.key)}
              >
                <svg
                  width="27px"
                  height="27px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12V17"
                    stroke="#041C32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12V17"
                    stroke="#041C32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7H20"
                    stroke="#041C32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                    stroke="#041C32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#041C32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </article>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          <p className="px-5 py-3">즐겨찾기에 추가된 항목이 없습니다.</p>
        </div>
      )}
          </li> */}
        </ul>
      </nav>
      {/* <button
        name="favorite"
        onClick={handleMenu}
      >
        <Image
          src="/img/starIcon.svg"
          alt="goHome"
          width={35}
          height={35}
          priority={true}
        />
      </button> */}
      <button
        className="absolute right-[5vw] mobile:opacity-0 smallPc:hidden w-[35px]"
        name="favorite"
        onClick={handleMenu}
      >
        <svg
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          fill={menu === "favorite" ? "#30A2FF" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
            stroke={menu === "favorite" ? "#30A2FF" : "#041C32"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  );
};

export default Title;
