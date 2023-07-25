import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <Link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          aria-label="googleFontLink"
        />
        <Link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          aria-label="googleFontLink"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
          aria-label="fontFile"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576721769362465"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a334fc5cbf4e4dc39b4d4d72b22eb4a2"}'
        />
        <meta property="og:url" content="https://calc-convertor.com/" />
        <meta property="og:title" content="계산쿤" />
        {/* <meta property="og:image" content="/images/webImg.png" /> */}
        <meta
          property="og:description"
          content="계산쿤을 이용해 손쉽게 변환 및 계신을 해보세요"
        />
        <meta property="og:site_name" content="계산쿤" />
        {/* <meta property="og:image:width" content="1200" /> */}
        {/* <meta property="og:image:height" content="630" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
