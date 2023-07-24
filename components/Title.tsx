import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MENU from "../utils/data/MENU";
import useHandleMenu from "../utils/zustand/useHandleMenu";
import usePcNav from "../utils/zustand/usePcNav";

interface propsType {
  title: string;
}

const Title = ({ title }: propsType) => {
  const { navMenu, setMenuNone, handlePcMenu } = usePcNav();
  const { menu, handleMenu } = useHandleMenu();
  const router = useRouter();

  useEffect(() => {
    const listener = (
      event: React.BaseSyntheticEvent | MouseEvent | TouchEvent
    ) => {
      if (!navMenu.section || navMenu.section.contains(event.target)) {
        return;
      }
      setMenuNone();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [navMenu.section, setMenuNone]);

  const changeRouting = (address: string) => {
    setMenuNone();
    let addressArr = [];

    MENU.map((menu) =>
      menu.childMenu.map((child) => {
        addressArr.push(child.address);
      })
    );
    const currentAddress = router.asPath;

    if (addressArr.includes(currentAddress)) {
      router.push(address);
    } else {
      router.replace(address);
    }
  };

  return (
    <header className="flex justify-between items-center pc:h-[93.5px] mobile:py-3 smallPc:py-5 px-[5vw] border-b text-[26px] text-grey bg-fourthYellow w-full mobile:px-5 relative z-[4] pc:fixed">
      <button onClick={() => router.push("/")}>
        <Image
          src="/img/homeIcon.svg"
          alt="goHome"
          width="0"
          height="0"
          sizes="100vw"
          className="mobile:h-[30px] smallPc:h-[40px] pc:h-[40px] mobile:w-[30px] smallPc:w-[40px] pc:w-[40px]"
          priority={true}
        />
      </button>
      <h1 className="pc:hidden mobile:text-[20px] smallPc:text-[25px]">
        {title}
      </h1>
      <nav className="mobile:hidden smallPc:hidden h-full flex">
        <ul className="flex space-x-10 font-[300] h-full hover:text-gray-500">
          {MENU.map((menu) => {
            if (menu.key !== "HOME") {
              return (
                <li
                  key={menu.key}
                  className="h-full flex items-center hover:text-black w-[120px] select-none"
                >
                  <button
                    name={menu.key}
                    onClick={handlePcMenu}
                    className="w-full"
                  >
                    {menu.name}
                  </button>
                  {navMenu.name === menu.key && (
                    <ul className="absolute top-[80px] text-[18px] flex w-fit px-5 bg-gray-700 py-2 rounded-full space-x-4">
                      {menu.key !== "HOME" &&
                        menu.childMenu.map((child) => (
                          <li
                            key={child.key}
                            className="text-white non-hover-bold hover:font-[400] cursor-pointer"
                            title={child.heading}
                          >
                            <button
                              name={child.key}
                              onClick={() => changeRouting(child.address)}
                            >
                              {child.heading}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              );
            }
          })}
        </ul>
      </nav>
      <div className="mobile:opacity-0 smallPc:opacity-0 w-[35px] flex items-center">
        <button
          className="mobile:hidden smallPc:hidden button"
          name="favorite"
          onClick={handleMenu}
          area-label="openFavoriteMenu"
        >
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill={menu === "favorite" ? "#30A2FF" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
              stroke={menu === "favorite" ? "#30A2FF" : "#041C32"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Title;
