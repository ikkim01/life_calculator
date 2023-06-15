import React from "react";
import { create } from "zustand";
import { calculateAge } from "../../components/Function";

export interface formType {
  formValue: {
    year: string;
    month: string;
    day: string;
  };
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (date: string) => void;
  age: number | "";
}

const useAgeFormData = create<formType>((set) => ({
  formValue: { year: "", month: "", day: "" },
  handleFormValue: (event: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => {
      const { name, value } = event.target;
      const { maxLength } = event.target;

      if (value.length > maxLength) {
        event.target.value = value.slice(0, maxLength);
      }

      if (value > event.target.max) {
        event.target.value = event.target.max;
      }

      return { formValue: { ...state.formValue, [name]: event.target.value } };
    }),
  onSubmit: () =>
    set((state) => {
      return {
        age: calculateAge(
          state.formValue.year,
          state.formValue.month,
          state.formValue.day
        ),
      };
    }),
  age: "",
}));

export default useAgeFormData;
