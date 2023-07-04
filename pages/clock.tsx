import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import { getClock } from "../components/query";
import Title from "../components/Title";
import MENU from "../utils/data/MENU";
import useCheckServerClock from "../utils/zustand/useCheckServerClock";

const indexNumber = 1;
const pageNumber = 4;

const Clock = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const { domain, currentDomain, serverTime } = useCheckServerClock();

  const getServerData = async (domain: string) => {
    const response = await axios.options(domain);

    console.log(response.headers.date);
  };

  getServerData("http://localhost:3000/");

  // const { isLoading, isError, data } = useQuery(["getClock"], getClock(domain), {
  //   staleTime: Infinity,
  //   cacheTime: Infinity,
  // });

  return (
    <main className="flex flex-col items-center space-y-7">
      <Header title={heading} explain={explain} />
      <Title title={heading} />
      <h3 className="text-center">
        입력한 주소의 <b>서버시간</b>을 계산합니다.
      </h3>
      <p className="px-5">
        각 페이지의 서버시간을 5분마다 자동으로 새로고침합니다.
      </p>
      <form className="w-full flex justify-center space-x-5">
        <input type="text" className="border rounded-lg w-2/3 h-[50px] px-5 " />
        <button
          type="button"
          className="px-8 py-2 rounded-lg border bg-fourthYellow"
        >
          검색하기
        </button>
      </form>
    </main>
  );
};

export default Clock;
