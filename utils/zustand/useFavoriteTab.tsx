import { create } from "zustand";

interface tabType {
  favoriteTab: string[];
  setFavoriteTab: (tabArr: string[]) => void;
  handleFavoriteTab: (tabName: string) => void;
}

const useFavoriteTab = create<tabType>((set) => ({
  favoriteTab: [],
  setFavoriteTab: (tabArr: string[]) => set({ favoriteTab: tabArr }),
  handleFavoriteTab: (tabName: string) =>
    set((state) => {
      const copyArr = state.favoriteTab;
      copyArr.includes(tabName)
        ? copyArr.splice(copyArr.indexOf(tabName), 1)
        : copyArr.push(tabName);

      return { favoriteTab: copyArr };
    }),
}));

export default useFavoriteTab;
