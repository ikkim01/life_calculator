import React from "react";
import MENU from "../utils/data/MENU";

interface propsType {
  favoriteTab: string[];
  handleFavoriteTabIndex: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuTab = (props: propsType) => {
  const { favoriteTab, handleFavoriteTabIndex } = props;

  return (
    <aside className="flex flex-col space-y-1 w-full px-3">
      {MENU.map((menu) => (
        <article
          key={menu.key}
          className="border w-full rounded-lg relative flex items-center"
        >
          <button className="w-full text-start h-full px-5 py-3  text-grey rounded-lg bg-white">
            {menu.heading}
          </button>
          <button
            className="absolute right-5"
            onClick={handleFavoriteTabIndex}
            name={String(menu.key)}
          >
            <svg
              width="18px"
              height="27px"
              viewBox="0 0 24 24"
              fill={favoriteTab.includes(String(menu.key)) ? "#30A2FF" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
                stroke={
                  favoriteTab.includes(String(menu.key)) ? "#30A2FF" : "#041C32"
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </article>
      ))}
    </aside>
  );
};

export default MenuTab;
