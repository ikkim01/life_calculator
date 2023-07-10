import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import SlideModal from "../components/SlideModal";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useHandleMenu from "../utils/zustand/useHandleMenu";
import Title from "../components/Title";
import MENU from "../utils/data/MENU";
import Custom404 from "./404";

export default function App({ Component, pageProps }: AppProps) {
  const { setMenuNone } = useHandleMenu();

  const mainRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setMenuNone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const findMenu = MENU.find((menu) =>
    menu.childMenu.find((child) => child.address === router.asPath)
  );

  const menuIndex = findMenu?.childMenu.findIndex(
    (child) => child.address === router.asPath
  );

  const data = findMenu?.childMenu[menuIndex];

  if (!findMenu)
    return (
      <>
        <Title title="오류 화면" />
        <Custom404 />
      </>
    );

  return (
    <div className="flex h-auto min-h-screen flex-col relative overflow-hidden">
      <Title title={data.heading} />
      <div className="pb-40" ref={mainRef}>
        <Component {...pageProps} />
      </div>
      <Nav />
      <SlideModal mainRef={mainRef} />
    </div>
  );
}
