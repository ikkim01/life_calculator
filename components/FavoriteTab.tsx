import React, { useEffect } from "react";
import MENU from "../utils/data/MENU";
import useFavoriteTab from "../utils/zustand/useFavoriteTab";

const FavoriteTab = () => {
  const { favoriteTab, setFavoriteTab } = useFavoriteTab();

  useEffect(() => {
    const cookieArr = document.cookie.split(";").map((cookie) => {
      const key = cookie.split("=")[0].trim();
      const value = cookie.split("=")[1].trim();

      return { key, value };
    });

    if (cookieArr.length !== 0) {
      const findCookie = cookieArr.find((cookie) => cookie.key === "favorite");

      findCookie.value && setFavoriteTab(findCookie.value.split(","));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(favoriteTab);

  return (
    <aside className="flex flex-col space-y-1 w-full px-3">
      {favoriteTab.length !== 0 ? (
        favoriteTab.map((favorite) => {
          const findMenu = MENU.find((menu) => menu.key === Number(favorite));
          return (
            <button
              key={findMenu.key}
              className="border w-full py-3 rounded-lg"
            >
              {findMenu.heading}
            </button>
          );
        })
      ) : (
        <p>즐겨찾기를 추가해주세요.</p>
      )}
    </aside>
  );
};

export default FavoriteTab;
