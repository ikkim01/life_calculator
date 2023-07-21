import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import MENU from "../utils/data/MENU";

interface propsType {
  favoriteTab: string[];
  handleFavoriteTabIndex: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeRouting: (address: string) => void;
}

const FavoriteTab = (props: propsType) => {
  const { favoriteTab, handleFavoriteTabIndex, changeRouting } = props;
  const router = useRouter();
  const findMenu = MENU.find((menu) =>
    menu.childMenu.find((child) => child.address === router.asPath)
  );
  const menuIndex = findMenu?.childMenu.findIndex(
    (child) => child.address === router.asPath
  );
  const data = findMenu?.childMenu[menuIndex];

  return (
    <aside className="flex flex-col space-y-3 w-full px-3 pc:h-max pc:pr-[20px]">
      {router.asPath !== "/" && data && !favoriteTab.includes(data.key) && (
        <button
          className="flex items-center justify-center space-x-3 text-white text-shadow mobile:text-[25px]"
          onClick={handleFavoriteTabIndex}
          name={String(data.key)}
        >
          <Image
            src="/img/PLUSICONWHITE.svg"
            alt="plusIcon"
            width={30}
            height={30}
            className="svg-shadow"
          />
          <p>현재 페이지 즐겨찾기 추가</p>
        </button>
      )}
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
        <div className="flex justify-center items-center">
          <p className="px-5 pt-16">즐겨찾기에 추가된 항목이 없습니다.</p>
        </div>
      )}
    </aside>
  );
};

export default FavoriteTab;
