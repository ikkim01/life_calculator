import { create } from "zustand";

export interface tabType {
  domain: string;
  currentDomain: string;
  onSearch: () => void;
  serverTime: null | Date;
}

const useCheckServerClock = create<tabType>((set) => ({
  domain: "",
  currentDomain: "",
  serverTime: null,
  onSearch: () =>
    set((state) => {
      return {
        currentDomain: state.domain,
      };
    }),
}));

export default useCheckServerClock;
