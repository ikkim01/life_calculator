import Image from "next/image";
import React from "react";
import MENU from "../utils/data/MENU";
import useHandleMenu from "../utils/zustand/useHandleMenu";

interface propsType {
  favoriteTab: string[];
  handleFavoriteTabIndex: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeRouting: (address: string) => void;
}

const MenuTab = (props: propsType) => {
  const { favoriteTab, handleFavoriteTabIndex, changeRouting } = props;
  const { toggleMenu, setToggleMenu } = useHandleMenu();

  return (
    <aside className="flex flex-col space-y-2 w-full px-5">
      {MENU.map((menu) => (
        <article
          key={menu.key}
          className="w-full rounded-lg relative flex flex-col space-y-2"
        >
          {menu.key !== "HOME" && (
            <div className="flex justify-between px-3">
              <label
                htmlFor={"toggle" + menu.key}
                className="select-none w-full flex justify-between items-center cursor-pointer"
              >
                <h2 className="flex items-center text-[30px] space-x-3 py-3">
                  <Image
                    src={menu.img}
                    alt={menu.explain}
                    width={35}
                    height={35}
                    priority={true}
                  />
                  <p>{menu.name}</p>
                </h2>
                <input
                  type="checkbox"
                  id={"toggle" + menu.key}
                  name={menu.key}
                  checked={toggleMenu.includes(menu.key)}
                  onChange={setToggleMenu}
                  className="opacity-0"
                />
                <svg
                  width="35px"
                  height="35px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    toggleMenu.includes(menu.key) ? "rotate-180" : "rotate-0"
                  } transition-all duration-150 `}
                >
                  <path
                    d="M8 10L12 14L16 10"
                    stroke="#FFD966"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
          )}
          <ul
            className={
              menu.key !== "HOME"
                ? !toggleMenu.includes(menu.key)
                  ? "space-y-2"
                  : ""
                : ""
            }
          >
            {menu.childMenu.map((child) => (
              <li
                key={child.key}
                className={`flex flex-col justify-center transition-all duration-150 relative ${
                  menu.key !== "HOME"
                    ? !toggleMenu.includes(menu.key)
                      ? "h-16"
                      : "h-0 opacity-0"
                    : ""
                }`}
              >
                <button
                  className={`w-full text-start h-full px-5 py-3 text-grey rounded-lg bg-white ${
                    menu.key !== "HOME"
                      ? !toggleMenu.includes(menu.key)
                        ? ""
                        : "hidden"
                      : ""
                  }`}
                  onClick={() => changeRouting(child.address)}
                >
                  {child.heading}
                </button>
                {child.key !== "home" && (
                  <button
                    className="absolute right-5"
                    onClick={handleFavoriteTabIndex}
                    name={child.key}
                  >
                    <svg
                      width="27px"
                      height="27px"
                      viewBox="0 0 24 24"
                      fill={
                        favoriteTab.includes(child.key) ? "#30A2FF" : "none"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
                        stroke={
                          favoriteTab.includes(child.key)
                            ? "#30A2FF"
                            : "#041C32"
                        }
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </aside>
  );
};

export default MenuTab;
