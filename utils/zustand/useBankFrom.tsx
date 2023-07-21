import { create } from "zustand";

export interface tabType {
  bankInput: {
    type: "deposit" | "savings";
    depositMoney: string;
    savingMoney: string;
    month: string;
    rate: string;
    monthType: "simple" | "monthCompound" | "yearCompound";
    interestType: "discount" | "normal";
  };
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputValueToLocaleString: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const useBankForm = create<tabType>((set) => ({
  bankInput: {
    type: "deposit",
    depositMoney: "",
    savingMoney: "",
    month: "",
    rate: "",
    monthType: "simple",
    interestType: "normal",
  },
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => {
      const { name, value } = event.target;

      return {
        bankInput: {
          ...state.bankInput,
          [name]: event.target.value,
        },
      };
    }),
  handleInputValueToLocaleString: (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    set((state) => {
      const { name, value } = event.target;
      const { maxLength, max } = event.target;

      if (maxLength !== -1 && value.length > maxLength) {
        event.target.value = value.slice(0, maxLength);
      }

      if (max && Number(value) > Number(max)) {
        event.target.value = max;
      }

      if (value.includes(",")) {
        event.target.value = value.replace(/,/g, "");
      }

      return {
        bankInput: {
          ...state.bankInput,
          [name]: Number(event.target.value).toLocaleString(),
        },
      };
    }),
}));

export default useBankForm;
