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
  convertAge: {
    year: string;
    month: string;
    day: string;
    age: number | "" | "error";
  };
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

      if (Number(value) > Number(event.target.max)) {
        event.target.value = event.target.max;
      }

      return { formValue: { ...state.formValue, [name]: event.target.value } };
    }),
  onSubmit: () =>
    set((state) => {
      const stateYear = state.formValue.year;
      const stateMonth = state.formValue.month;
      const stateDay = state.formValue.day;

      const convertCalculateAge = calculateAge(stateYear, stateMonth, stateDay);
      if (!stateYear || !stateMonth || !stateDay) {
        return {
          convertAge: {
            age: "error",
            year: "",
            month: "",
            day: "",
          },
        };
      } else if (!Number.isNaN(convertCalculateAge)) {
        return {
          convertAge: {
            age: convertCalculateAge,
            year: stateYear,
            month: stateMonth,
            day: stateDay,
          },
        };
      } else {
        return {
          convertAge: {
            age: "error",
            year: "",
            month: "",
            day: "",
          },
        };
      }
    }),
  convertAge: { year: "", month: "", day: "", age: "" },
}));

export default useAgeFormData;
