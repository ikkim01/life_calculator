import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import SlideModal from "../components/SlideModal";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useHandleMenu from "../utils/zustand/useHandleMenu";

export default function App({ Component, pageProps }: AppProps) {
  const { setMenuNone } = useHandleMenu();

  const mainRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setMenuNone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <div className="flex h-auto min-h-screen flex-col relative overflow-hidden">
      <div className="pb-40" ref={mainRef}>
        <Component {...pageProps} />
      </div>
      <Nav />
      <SlideModal mainRef={mainRef} />
    </div>
  );
}
