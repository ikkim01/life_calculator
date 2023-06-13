import React from "react";
import MENU from "../utils/data/MENU";

const MenuTab = () => {
  return (
    <aside className="flex flex-col space-y-1 w-full px-3">
      {MENU.map((menu) => (
        <button key={menu.key} className="border w-full py-3 rounded-lg">
          {menu.heading}
        </button>
      ))}
    </aside>
  );
};

export default MenuTab;
