import React from "react";
import Header from "../components/Header";
import MENU from "../utils/data/MENU";
import useBankForm from "../utils/zustand/useBankFrom";

const indexNumber = 1;
const pageNumber = 3;

const Bank = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const { bankInput, handleFormValue } = useBankForm();
  const { type, depositMoney, savingMoney, month, monthType } = bankInput;

  return (
    <main className="flex flex-col items-center space-y-7 pc:mt-navTop py-mainPadding">
      <Header title={heading} explain={explain} />
      <h3 className="text-center">
        입력한 정보를 바탕으로 <b>예금 / 적금 총 금액,이자</b>를 계산합니다.
      </h3>
      <p className="px-5">
        월 예치금, 예금, 금리를 입력하여 해당 기간동안 이자, 총 금액을
        확인해보세요.
      </p>
      <form className="space-y-5 flex flex-col items-center">
        <section className="flex space-x-5">
          <h6>구분 : </h6>
          <label htmlFor="deposit" className="flex items-center space-x-3">
            <input
              type="radio"
              name="type"
              id="deposit"
              checked={type === "deposit"}
              onChange={handleFormValue}
              value="deposit"
            />
            <p>예금</p>
          </label>
          <label htmlFor="savings" className="flex items-center space-x-3">
            <input
              type="radio"
              name="type"
              id="savings"
              checked={type === "savings"}
              onChange={handleFormValue}
              value="savings"
            />
            <p>적금</p>
          </label>
        </section>
        <section className="flex space-x-5">
          <h6>{type === "deposit" ? "예치금" : "월 적금"} :</h6>
          <input
            type="number"
            className="border w-[200px] px-4 py-2 rounded-lg"
          />
        </section>
        <section className="flex space-x-5">
          <h6>{type === "deposit" ? "예치 기간" : "적금기간"} : </h6>
          <input
            type="number"
            className="border w-[200px] px-4 py-2 rounded-lg"
          />
        </section>
        <section className="flex space-x-5">
          <h6>이자율 : </h6>
          <input
            type="number"
            className="border w-[200px] px-4 py-2 rounded-lg"
          />
          <label htmlFor="simple" className="flex items-center space-x-3">
            <input
              type="radio"
              name="monthType"
              id="simple"
              checked={monthType === "simple"}
              onChange={handleFormValue}
              value="simple"
            />
            <p>단리</p>
          </label>
          <label htmlFor="compound" className="flex items-center space-x-3">
            <input
              type="radio"
              name="monthType"
              id="compound"
              checked={monthType === "compound"}
              onChange={handleFormValue}
              value="compound"
            />
            <p>복리</p>
          </label>
        </section>
        <button
          className="px-8 py-2 rounded-lg border bg-fourthYellow"
          type="button"
          // onClick={() => onSubmit(year + month + day)}
        >
          계산하기
        </button>
      </form>
    </main>
  );
};

export default Bank;
