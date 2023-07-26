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
import useImgForm from "../utils/zustand/useImgForm";
import Footer from "../components/footer";

export default function App({ Component, pageProps }: AppProps) {
  const { setMenuNone } = useHandleMenu();
  const { resetState } = useImgForm();

  const mainRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setMenuNone();
    resetState();
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
    <div className="flex h-auto min-h-screen flex-col relative overflow-hidden items-center">
      <Title title={data.heading} />
      <div className="flex space-x-3 justify-center w-full">
        <div className="pc:border-r pc:w-2/12">
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576721769362465"
            crossOrigin="anonymous"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8576721769362465"
            data-ad-slot="1671645750"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
        <div
          className="mobile:pb-40 smallPc:pb-40 pc:w-10/12 smallPc:w-full mobile:w-full"
          ref={mainRef}
        >
          <Component {...pageProps} />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576721769362465"
            crossOrigin="anonymous"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8576721769362465"
            data-ad-slot="9765758197"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <Footer />
        </div>
      </div>
      <Nav />
      <SlideModal mainRef={mainRef} />
    </div>
  );
}
