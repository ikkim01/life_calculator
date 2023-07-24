import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        {/* <meta property="og:url" content="https://hituppartners.com" /> */}
        {/* <meta property="og:title" content="히트업몰 파트너페이지" /> */}
        {/* <meta property="og:image" content="/images/webImg.png" /> */}
        {/* <meta
            property="og:description"
            content="히트업몰 입점으로 다양한 혜택을 누려보세요!"
          /> */}
        {/* <meta property="og:site_name" content="히트업몰 파트너페이지" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
