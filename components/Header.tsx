import Head from "next/head";
import React from "react";

interface propsType {
  title: string;
  explain: string;
}

const Header = ({ title, explain }: propsType) => {
  return (
    <Head>
      <title>{`${title} | 계산쿤`}</title>
      <meta name="description" content={explain} />
      <meta property="og:description" content={explain} />
    </Head>
  );
};

export default Header;
