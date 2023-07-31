import React, { useRef } from "react";
import Header from "../components/Header";
import MENU from "../utils/data/MENU";
import useBankForm from "../utils/zustand/useBankFrom";

const indexNumber = 1;
const pageNumber = 3;

const Bank = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const {
    bankInput,
    handleFormValue,
    handleInputValueToLocaleString,
    handleInputNumber,
    calDeposit,
    calSaving,
    calculatorData,
  } = useBankForm();
  const {
    type,
    depositMoney,
    savingMoney,
    depositRate,
    savingRate,
    depositMonth,
    savingMonth,
    monthType,
    interestType,
  } = bankInput;
  const { money, tax, interest } = calculatorData;
  const dateArrRef = useRef([]);

  return (
    <main className="flex flex-col items-center space-y-7 pc:mt-navTop py-mainPadding px-5">
      <Header title={heading} explain={explain} />
      <h1 className="text-center">
        입력한 정보를 바탕으로 <b>예금 / 적금 총 금액,이자</b>를 계산합니다.
      </h1>
      <h2 className="px-5 text-s w-2/3">
        월 예치금, 예금, 금리를 입력하여 해당 기간동안 이자, 총 금액을
        확인해보세요.
      </h2>
      <form className="space-y-5 flex flex-col">
        <section className="flex pc:space-x-5 smallPc:space-x-5 mobile:flex-col ">
          <h6 className="separateSection mobile:after:content-none">구분</h6>
          <article className="flex space-x-5">
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
          </article>
        </section>
        <section className="flex pc:space-x-3 smallPc:space-x-3 mobile:flex-col">
          <h6 className="separateSection mobile:after:content-none">
            {type === "deposit" ? "예치금" : "월 적금"}
          </h6>
          <article className="flex space-x-3">
            <input
              type="string"
              pattern="\d*"
              name={type === "deposit" ? "depositMoney" : "savingMoney"}
              className="border w-[200px] px-4 rounded-lg"
              value={type === "deposit" ? depositMoney : savingMoney}
              onChange={handleInputValueToLocaleString}
              ref={(ref: any) => (dateArrRef.current[0] = ref)}
            />
            <p>원</p>
          </article>
        </section>

        <section className="flex pc:space-x-3 smallPc:space-x-3 mobile:flex-col">
          <h6 className="separateSection mobile:after:content-none">
            {type === "deposit" ? "예치 기간" : "적금기간"}
          </h6>
          <article className="flex space-x-3">
            <input
              type="number"
              name={type === "deposit" ? "depositMonth" : "savingMonth"}
              pattern="\d*"
              className="border w-[200px] px-4 rounded-lg"
              value={type === "deposit" ? depositMonth : savingMonth}
              maxLength={3}
              onChange={handleInputValueToLocaleString}
              ref={(ref: any) => (dateArrRef.current[1] = ref)}
            />
            <p>개월</p>
          </article>
        </section>
        <section className="flex pc:space-x-3 smallPc:space-x-3 mobile:flex-col">
          <h6 className="separateSection mobile:after:content-none">이자율</h6>
          <article className="flex space-x-3">
            <input
              type="number"
              name={type === "deposit" ? "depositRate" : "savingRate"}
              pattern="\d*"
              className="border w-[200px] px-4 rounded-lg"
              value={type === "deposit" ? depositRate : savingRate}
              onChange={handleInputNumber}
              ref={(ref: any) => (dateArrRef.current[2] = ref)}
              inputMode="decimal"
              max={99}
            />
            <p>%</p>
          </article>
        </section>

        <section className="flex pc:space-x-5 smallPc:space-x-5 mobile:flex-col">
          <h6 className="separateSection mobile:after:content-none">
            이자 형태
          </h6>
          <article className="flex space-x-5">
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
            <label
              htmlFor="monthCompound"
              className="flex items-center space-x-3"
            >
              <input
                type="radio"
                name="monthType"
                id="monthCompound"
                checked={monthType === "monthCompound"}
                onChange={handleFormValue}
                value="monthCompound"
              />
              <p>월복리</p>
            </label>
          </article>
        </section>
        <section className="flex pc:space-x-5 smallPc:space-x-5 mobile:flex-col">
          <h6 className="separateSection mobile:after:content-none">
            이자과세
          </h6>
          <article className="space-x-5 flex">
            <label htmlFor="normal" className="flex items-center space-x-3">
              <input
                type="radio"
                name="interestType"
                id="normal"
                checked={interestType === "normal"}
                onChange={handleFormValue}
                value="normal"
              />
              <p>
                일반과세 <span className="text-s">(15.4%)</span>
              </p>
            </label>
            <label htmlFor="discount" className="flex items-center space-x-3">
              <input
                type="radio"
                name="interestType"
                id="discount"
                checked={interestType === "discount"}
                onChange={handleFormValue}
                value="discount"
              />
              <p>
                세금우대 <span className="text-s">(1.4%)</span>
              </p>
            </label>
          </article>
        </section>
        <div className="flex justify-center pt-5">
          <button
            className="px-20 py-2 rounded-lg border bg-fourthYellow"
            type="button"
            onClick={() =>
              type === "deposit"
                ? calDeposit(
                    dateArrRef.current[0],
                    dateArrRef.current[1],
                    dateArrRef.current[2]
                  )
                : calSaving(
                    dateArrRef.current[0],
                    dateArrRef.current[1],
                    dateArrRef.current[2]
                  )
            }
          >
            계산하기
          </button>
        </div>
      </form>
      {money !== 0 && (
        <section className="mobile:w-full pc:w-1/2 smallPc:w-1/2">
          <ul>
            <li className="w-full flex justify-between">
              <p>원금 합계</p>
              <p>{money.toLocaleString()}원</p>
            </li>
            <li className="w-full flex justify-between">
              <p>세전이자</p>
              <p>{interest.toLocaleString()}원</p>
            </li>
            <li className="w-full flex justify-between">
              <p>이자과세</p>
              <p>-{tax.toLocaleString()}원</p>
            </li>
            <li className="w-full flex justify-between">
              <p>세후 수령액</p>
              <p>{(money + interest - tax).toLocaleString()}원</p>
            </li>
          </ul>
        </section>
      )}
    </main>
  );
};

export default Bank;
