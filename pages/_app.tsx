import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import SlideModal from "../components/SlideModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-auto min-h-screen flex-col relative overflow-hidden">
      <div className="pb-40 ">
        <Component {...pageProps} />
      </div>
      <Nav />
      <SlideModal />
    </div>
  );
}
