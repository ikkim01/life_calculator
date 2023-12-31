import React, { useRef } from "react";
import MENU from "../utils/data/MENU";
import useLunarFormData from "../utils/zustand/useLunarFormData";
import Header from "../components/Header";
import { getDaysInMonth } from "../components/Function";

const indexNumber = 1;
const pageNumber = 1;

const Lunar = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const { formValue, handleFormValue, onSubmit, convertDate } =
    useLunarFormData();
  const { year, month, day } = formValue;
  const dateArrRef = useRef([]);

  const focusNextInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.currentTarget.value.length === event.currentTarget.maxLength) {
      dateArrRef.current[index + 1].focus();
    }
  };

  const checkEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit(year + month + day);
    }
  };

  return (
    <main className="flex flex-col items-center space-y-7 pc:mt-navTop py-mainPadding">
      <Header title={heading} explain={explain} />
      <h1 className="text-center">
        입력한 날짜를 음력으로 계산합니다.
        <br /> (1900년 ~ 2050년)
      </h1>
      <h2 className="px-5 text-s w-2/3">
        음력은 달이 지구를 한 바퀴 돌면서 초승달에서 상현달, 보름달, 하현달,
        다시 그믐달로 변하는 주기를 날짜 표기에 사용한 것입니다.
      </h2>
      <form className="flex flex-col space-y-5 w-full items-center">
        <div className="flex space-x-3">
          <input
            type="number"
            value={year}
            name="year"
            className="border w-[90px] px-4 py-2 rounded-lg"
            pattern="\d*"
            placeholder="YYYY"
            maxLength={4}
            min={1900}
            max={2050}
            onChange={handleFormValue}
            onKeyUp={(event) => focusNextInput(event, 0)}
            ref={(ref: any) => (dateArrRef.current[0] = ref)}
          />
          <input
            type="number"
            value={month}
            name="month"
            className="border w-[60px] p-2 rounded-lg"
            pattern="\d*"
            placeholder="MM"
            maxLength={2}
            min={1}
            max={12}
            onChange={handleFormValue}
            onKeyUp={(event) => focusNextInput(event, 1)}
            ref={(ref: any) => (dateArrRef.current[1] = ref)}
          />
          <input
            type="number"
            value={day}
            name="day"
            className="border w-[60px] p-2 rounded-lg"
            pattern="\d*"
            placeholder="DD"
            maxLength={2}
            min={1}
            onKeyUp={checkEnter}
            max={getDaysInMonth(year, month)}
            onChange={handleFormValue}
            ref={(ref: any) => (dateArrRef.current[2] = ref)}
          />
        </div>
        {convertDate.date === "error" && (
          <p className="text-red-500">잘못된 날짜 형식입니다.</p>
        )}
        <button
          className="px-8 py-2 rounded-lg border bg-fourthYellow"
          type="button"
          onClick={() => onSubmit(year + month + day)}
        >
          계산하기
        </button>
      </form>
      {convertDate.date && convertDate.date !== "error" && (
        <p>
          <span className="font-[900] text-mainBlue text-m">
            {convertDate.year}년 {convertDate.month}월 {convertDate.day}일
          </span>{" "}
          의 <br /> 음력은{" "}
          <span className="font-[900] text-mainBlue text-m">
            {convertDate.date}
          </span>
          입니다.
        </p>
      )}
    </main>
  );
};

export default Lunar;
