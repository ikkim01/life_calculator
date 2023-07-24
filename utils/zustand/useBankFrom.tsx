import { create } from "zustand";
import {
  calculateDepositInterest,
  calculateSavingsInterest,
} from "../../components/Function";

export interface tabType {
  bankInput: {
    type: "deposit" | "savings";
    depositMoney: string;
    savingMoney: string;
    depositMonth: string;
    savingMonth: string;
    depositRate: string;
    savingRate: string;
    monthType: "simple" | "monthCompound";
    interestType: "discount" | "normal";
  };
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputValueToLocaleString: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleInputNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  calDeposit: (
    focusRef1: HTMLInputElement,
    focusRef2: HTMLInputElement,
    focusRef3: HTMLInputElement
  ) => void;
  calSaving: (
    focusRef1: HTMLInputElement,
    focusRef2: HTMLInputElement,
    focusRef3: HTMLInputElement
  ) => void;
  calculatorData: {
    money: number;
    interest: number;
    tax: number;
  };
}

const useBankForm = create<tabType>((set) => ({
  bankInput: {
    type: "deposit",
    depositMoney: "",
    savingMoney: "",
    depositMonth: "",
    savingMonth: "",
    depositRate: "",
    savingRate: "",
    monthType: "simple",
    interestType: "normal",
  },
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => {
      const { name } = event.target;

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

      event.target.value = event.target.value.replace(/[^0-9,.]/g, "");

      return {
        bankInput: {
          ...state.bankInput,
          [name]: Number(event.target.value).toLocaleString(),
        },
      };
    }),
  handleInputNumber: (event) =>
    set((state) => {
      const { name, value } = event.target;
      const { maxLength, max } = event.target;

      if (maxLength !== -1 && value.length > maxLength) {
        event.target.value = value.slice(0, maxLength);
      }

      if (max && Number(value) > Number(max)) {
        event.target.value = max;
      }

      return {
        bankInput: {
          ...state.bankInput,
          [name]: event.target.value,
        },
      };
    }),
  calDeposit: (focusRef1, focusRef2, focusRef3) =>
    set((state) => {
      const {
        depositMoney,
        depositRate,
        depositMonth,
        interestType,
        monthType,
      } = state.bankInput;

      if (!depositMoney || !depositRate || !depositMonth) {
        if (!depositMoney) {
          alert("예치금을 입력해주세요.");
          focusRef1.focus();
          return {};
        } else if (!depositMonth) {
          alert("예치기간을 입력해주세요.");
          focusRef2.focus();
          return {};
        } else if (!depositRate) {
          alert("이자율을 입력해주세요.");
          focusRef3.focus();
          return {};
        } else if (Number.isNaN(depositRate)) {
          alert("올바르지 않은 이자율입니다.");
          focusRef3.focus();
          return {};
        }
      } else {
        return {
          calculatorData: calculateDepositInterest(
            depositMoney,
            monthType,
            depositRate,
            depositMonth,
            interestType
          ),
        };
      }
    }),
  calSaving: (focusRef1, focusRef2, focusRef3) =>
    set((state) => {
      const { savingMoney, savingMonth, savingRate, monthType, interestType } =
        state.bankInput;

      if (!savingMoney || !savingRate || !savingMonth) {
        if (!savingMoney) {
          alert("월 적금을 입력해주세요.");
          focusRef1.focus();
          return {};
        } else if (!savingMonth) {
          alert("적금기간을 입력해주세요.");
          focusRef2.focus();
          return {};
        } else if (!savingRate) {
          alert("이자율을 입력해주세요.");
          focusRef3.focus();
          return {};
        } else if (Number.isNaN(savingRate)) {
          alert("올바르지 않은 이자율입니다.");
          focusRef3.focus();
          return {};
        }
      } else {
        return {
          calculatorData: calculateSavingsInterest(
            savingMoney,
            monthType,
            savingRate,
            savingMonth,
            interestType
          ),
        };
      }
    }),
  calculatorData: {
    money: 0,
    interest: 0,
    tax: 0,
  },
}));

export default useBankForm;
