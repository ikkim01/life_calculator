import { create } from "zustand";

export interface tabType {
  bankInput: {
    type: "deposit" | "savings";
    depositMoney: number | "";
    savingMoney: number | "";
    month: number | "";
    monthType: "simple" | "compound";
  };
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useBankForm = create<tabType>((set) => ({
  bankInput: {
    type: "deposit",
    depositMoney: "",
    savingMoney: "",
    month: "",
    monthType: "simple",
  },
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => {
      const { name, value } = event.target;
      const { maxLength, max } = event.target;

      if (maxLength !== -1 && value.length > maxLength) {
        event.target.value = value.slice(0, maxLength);
      }

      if (max && Number(value) > Number(max)) {
        event.target.value = max;
      }

      return { bankInput: { ...state.bankInput, [name]: event.target.value } };
    }),
}));

export default useBankForm;
