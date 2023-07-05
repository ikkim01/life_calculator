import React from "react";
import { create } from "zustand";

interface menuType {
  navMenu: {
    name: "NONE" | "CALCULATOR" | "CONVERTER" | "FAVORITE" | string;
    section: null | HTMLElement;
  };
  handlePcMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setMenuNone: () => void;
}

const usePcNav = create<menuType>((set) => ({
  navMenu: { name: "NONE", section: null },
  handlePcMenu: (event) =>
    set((state) => {
      const { name, parentElement } = event.currentTarget;

      return {
        navMenu:
          state.navMenu.name === name
            ? { name: "NONE", section: null }
            : { name, section: parentElement },
      };
    }),
  setMenuNone: () => set({ navMenu: { name: "NONE", section: null } }),
}));

export default usePcNav;
