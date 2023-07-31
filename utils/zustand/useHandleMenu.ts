import { create } from "zustand";

interface menuType {
  menu: "none" | "favorite" | "menu" | string;
  handleMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setMenuNone: () => void;
  toggleMenu: string[];
  setToggleMenu: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useHandleMenu = create<menuType>((set) => ({
  menu: "",
  handleMenu: (event) =>
    set((state) => {
      const { name } = event.currentTarget;

      return { menu: state.menu === name ? "none" : name };
    }),
  setMenuNone: () => set({ menu: "none" }),
  toggleMenu: [],
  setToggleMenu: (event) =>
    set((state) => {
      const copyArr = state.toggleMenu;
      const { name } = event.currentTarget;

      copyArr.includes(name)
        ? copyArr.splice(copyArr.indexOf(name), 1)
        : copyArr.push(name);

      return { toggleMenu: copyArr };
    }),
}));

export default useHandleMenu;
