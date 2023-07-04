import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import MENU from "../utils/data/MENU";
import useBankForm from "../utils/zustand/useBankFrom";

const indexNumber = 1;
const pageNumber = 3;

const Bank = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const { bankInput, handleFormValue } = useBankForm();
  const { type, depositMoney, savingMoney, month, monthType } = bankInput;

  return (
    <main className="flex flex-col items-center space-y-7">
      <Header title={heading} explain={explain} />
      <Title title={heading} />
      <h3 className="text-center">
        입력한 정보를 바탕으로 <b>예금 / 적금 총 금액,이자</b>를 계산합니다.
      </h3>
      <p className="px-5">
        월 예치금, 예금, 금리를 입력하여 해당 기간동안 이자, 총 금액을
        확인해보세요.
      </p>
      <form>
        <section className="flex space-x-5">
          <h6>구분 : </h6>
          <label htmlFor="deposit">
            <input
              type="radio"
              name="type"
              id="deposit"
              checked={type === "deposit"}
              onChange={handleFormValue}
              value="deposit"
            />
            예금
          </label>
          <label htmlFor="savings">
            <input
              type="radio"
              name="type"
              id="savings"
              checked={type === "savings"}
              onChange={handleFormValue}
              value="savings"
            />
            적금
          </label>
        </section>
        <section className="flex space-x-5">
          <h6>{type === "deposit" ? "예치금" : "월 적금"}</h6>
        </section>
      </form>
    </main>
  );
};

export default Bank;
