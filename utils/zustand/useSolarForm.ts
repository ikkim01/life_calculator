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
    plusDate: string;
  };
}

const useSolarFormData = create<formType>((set) => ({
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
            plusDate: "",
          },
        };
      } else {
        const solarDay = dayCalcDisplay(stateYear, stateMonth, stateDay, 2);

        return {
          convertDate: {
            date:
              solarDay.year +
              "년 " +
              (solarDay.leapMonth ? "(윤)" : "") +
              solarDay.month +
              "월 " +
              solarDay.day +
              "일 ",
            year: stateYear,
            month: stateMonth,
            day: stateDay,
            plusDate:
              solarDay.plusYear && solarDay.plusMonth && solarDay.plusDay
                ? solarDay.plusYear +
                  "년 " +
                  solarDay.plusMonth +
                  "월 " +
                  solarDay.plusDay +
                  "일 "
                : "",
          },
        };
      }
    }),
  convertDate: {
    year: "",
    month: "",
    day: "",
    date: "",
    plusDate: "",
  },
}));

export default useSolarFormData;
