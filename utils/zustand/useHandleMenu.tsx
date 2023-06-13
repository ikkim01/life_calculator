import { create } from "zustand";

interface menuType {
  menu: "none" | "favorite" | "menu";
  setMenu: (id: string) => void;
}

const useHandleMenu = create<menuType>((set) => ({
  menu: "none",
  setMenu: (input: "none" | "favorite" | "menu") => set({ menu: input }),
}));

export default useHandleMenu;
