import React, { useRef } from "react";
import { getDaysInLunarMonth } from "../components/Function";
import Header from "../components/Header";
import MENU from "../utils/data/MENU";
import useSolarFormData from "../utils/zustand/useSolarForm";

const indexNumber = 1;
const pageNumber = 2;

const Solar = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const { formValue, handleFormValue, onSubmit, convertDate } =
    useSolarFormData();
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
        입력한 날짜를 양력으로 계산합니다.
        <br /> (1900년 ~ 2050년)
      </h1>
      <h2 className="px-5 text-[15px]">
        태양의 황도상 운행, 즉 계절이 바뀌는 주기를 근거로 만들어진 달력. 현재
        세계의 공통 달력으로서 시행되고 있는 그레고리력은 이것의 일종으로, 1년을
        거의 태양년과 같게 한 것임. 1년을 365일, 4년마다 윤년을 두어 366일로
        하고, 100년마다 윤년을 1회 줄이고, 400년에 윤년을 97회로 함.
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
            max={getDaysInLunarMonth(year, month)}
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
          <span className="font-[900] text-mainBlue text-[20px]">
            {convertDate.year}년 {convertDate.month}월 {convertDate.day}일
          </span>{" "}
          의 <br /> 양력은{" "}
          <span className="font-[900] text-mainBlue text-[20px]">
            {convertDate.date}
          </span>
          입니다.
          {convertDate.plusDate && <span>{convertDate.plusDate}</span>}
        </p>
      )}
    </main>
  );
};

export default Solar;
