import React from "react";
import { create } from "zustand";
import { dayCalcDisplay } from "../../components/Function";

export interface formType {
  formValue: {
    year: string;
    month: string;
    day: string;
  };
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (date: string) => void;
  convertDate: {
    year: string;
    month: string;
    day: string;
    date: string | "error";
  };
}

const useMoonFormData = create<formType>((set) => ({
  formValue: { year: "", month: "", day: "" },
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => {
      const { name, value } = event.target;
      const { maxLength } = event.target;

      if (value.length > maxLength) {
        event.target.value = value.slice(0, maxLength);
      }

      if (Number(value) > Number(event.target.max)) {
        event.target.value = event.target.max;
      }

      if (
        value.length === maxLength &&
        Number(value) < Number(event.target.min)
      ) {
        event.target.value = event.target.min;
      }

      return { formValue: { ...state.formValue, [name]: event.target.value } };
    }),
  onSubmit: () =>
    set((state) => {
      const stateYear = state.formValue.year;
      const stateMonth = state.formValue.month;
      const stateDay = state.formValue.day;

      if (
        !stateYear ||
        Number(stateYear) == 0 ||
        !stateMonth ||
        Number(stateMonth) == 0 ||
        !stateDay ||
        Number(stateDay) == 0
      ) {
        return {
          convertDate: {
            date: "error",
            year: "",
            month: "",
            day: "",
          },
        };
      } else {
        const lunarDay = dayCalcDisplay(stateYear, stateMonth, stateDay);

        return {
          convertDate: {
            date: lunarDay,
            year: stateYear,
            month: stateMonth,
            day: stateDay,
          },
        };
      }
    }),
  convertDate: { year: "", month: "", day: "", date: "" },
}));

export default useMoonFormData;
