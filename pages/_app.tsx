import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-auto min-h-screen flex-col relative">
      <div className="h-[1000px] pb-10">
        <Component {...pageProps} />
      </div>
      <Nav />
    </div>
  );
}
