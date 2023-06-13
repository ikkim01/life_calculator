import React from "react";
import useHandleMenu from "../utils/zustand/useHandleMenu";
import FavoriteTab from "./FavoriteTab";
import MenuTab from "./MenuTab";

const SlideModal = () => {
  const { menu, setMenu } = useHandleMenu();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    setMenu(name);
  };

  return (
    <div
      className={`bg-secondSky/20 fixed w-full bottom-[-500px] space-y-3 transition-all duration-700 z-[1] min-h-[500px] max-h-[500px] flex flex-col items-center ${
        menu === "favorite" || menu === "menu"
          ? "translate-y-[-500px]"
          : "translate-y-[0px]"
      }`}
    >
      <button
        name="none"
        onClick={handleMenu}
        className={menu === "none" ? "hidden" : ""}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
            fill="#000000"
          />
        </svg>
      </button>
      {menu === "favorite" && <FavoriteTab />}
      {menu === "menu" && <MenuTab />}
    </div>
  );
};

export default SlideModal;
