import React, { useRef } from "react";
import { getDaysInMonth } from "../components/Function";
import Header from "../components/Header";
import MENU from "../utils/data/MENU";
import useAgeFormData from "../utils/zustand/useAgeFormData";

const indexNumber = 1;
const pageNumber = 0;

const Age = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const { formValue, handleFormValue, onSubmit, convertAge } = useAgeFormData();
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
    <main className="flex flex-col items-center space-y-7 pt-navTop">
      <Header title={heading} explain={explain} />

      <h3 className="text-center">
        오늘을 기준으로 <b>만 나이</b>를 계산합니다.
      </h3>
      <p className="px-5">
        만 나이는 태어날 때 0세이며 다음 해 생일이 되는 날부터 1세로 계산하는
        나이이며 국제표준인 나이입니다. 실제로 태어나서 살아온 날에 제일
        근접하는 나이 셈법입니다.
      </p>
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
        {convertAge.age === "error" && (
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
      {convertAge.age && convertAge.age !== "error" && (
        <p>
          오늘 기준으로{" "}
          <span className="font-[900] text-mainBlue text-[20px]">
            {convertAge.year}년 {convertAge.month}월 {convertAge.day}일
          </span>{" "}
          생의 <br /> 만 나이는{" "}
          <span className="font-[900] text-mainBlue text-[20px]">
            {convertAge.age}
          </span>
          세 입니다.
        </p>
      )}
    </main>
  );
};

export default Age;
