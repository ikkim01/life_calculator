import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import MENU from "../utils/data/MENU";
import useFavoriteTab from "../utils/zustand/useFavoriteTab";
import useHandleMenu from "../utils/zustand/useHandleMenu";
import FavoriteTab from "./FavoriteTab";
import MenuTab from "./MenuTab";
import { useOnClickOutside } from "./useOnClickOutside";

const SlideModal = () => {
  const { menu, setMenu } = useHandleMenu();
  const { favoriteTab, setFavoriteTab, handleFavoriteTab } = useFavoriteTab();
  const router = useRouter();
  const modalRef = useRef();

  useEffect(() => {
    if (document.cookie) {
      const cookieArr = document.cookie.split(";").map((cookie) => {
        const key = cookie?.split("=")[0].trim();
        const value = cookie?.split("=")[1].trim();

        return { key, value };
      });

      if (cookieArr.length !== 0) {
        const findCookie = cookieArr.find(
          (cookie) => cookie.key === "favorite"
        );

        findCookie.value && setFavoriteTab(findCookie.value.split(","));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoriteTabIndex = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { name } = event.currentTarget;

    handleFavoriteTab(name);
  };

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    setMenu(name);
  };

  const changeRouting = (address: string) => {
    setMenu("none");

    const addressArr = MENU.map((menu) => menu.address);
    const currentAddress = router.asPath;

    if (addressArr.includes(currentAddress)) {
      router.push(address);
    } else {
      router.replace(address);
    }
  };

  useOnClickOutside(modalRef, () => setMenu("none"));

  return (
    <div
      ref={modalRef}
      className={`bg-menuBackground/90 fixed w-full bottom-[-450px] space-y-3 pt-3 pb-5 transition-all duration-1000 z-[1] h-[300px] flex flex-col items-center overflow-scroll ${
        menu === "favorite" || menu === "menu"
          ? "translate-y-[-610px]"
          : "translate-y-[0px]"
      }`}
    >
      <button
        name="none"
        onClick={handleMenu}
        className={menu === "none" ? "hidden" : "w-full flex justify-center"}
      >
        <svg
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 10L12 14L16 10"
            stroke="#FFD966"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {menu === "favorite" && (
        <FavoriteTab
          favoriteTab={favoriteTab}
          handleFavoriteTabIndex={handleFavoriteTabIndex}
          changeRouting={changeRouting}
        />
      )}
      {menu === "menu" && (
        <MenuTab
          favoriteTab={favoriteTab}
          handleFavoriteTabIndex={handleFavoriteTabIndex}
          changeRouting={changeRouting}
        />
      )}
    </div>
  );
};

export default SlideModal;
