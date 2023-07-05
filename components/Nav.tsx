import React from "react";
import useHandleMenu from "../utils/zustand/useHandleMenu";

const Nav = () => {
  const { menu, handleMenu } = useHandleMenu();

  return (
    <div className="fixed bottom-0 bg-fourthYellow text-grey w-screen flex flex-col h-40 z-[2] pc:hidden">
      <nav className="flex justify-between px-20 items-center h-20 border-b border-t shadow-[0_-20px_-13px_rgb(0,0,0,0.03)]">
        <button
          className="flex flex-col justify-center items-center button"
          name="favorite"
          onClick={handleMenu}
        >
          <svg
            width="40px"
            height="40px"
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
          <p
            className={`text-[20px] ${
              menu === "favorite" ? "text-mainBlue" : "text-grey"
            } select-none`}
          >
            즐겨찾기
          </p>
        </button>
        <button
          className="flex flex-col justify-center items-center button"
          name="menu"
          onClick={handleMenu}
        >
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Menu / Hamburger_MD">
              <path
                id="Vector"
                d="M5 17H19M5 12H19M5 7H19"
                stroke={menu === "menu" ? "#30A2FF" : "#041C32"}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <p
            className={`text-[20px] ${
              menu === "menu" ? "text-mainBlue" : "text-grey"
            } select-none`}
          >
            메뉴
          </p>
        </button>
      </nav>
      <div className="flex items-center justify-center h-20 p-5 bg-white">
        <p>광고자리</p>
      </div>
    </div>
  );
};

export default Nav;
