import Head from "next/head";
import React from "react";

interface propsType {
  title: string;
}

const Header = ({ title }: propsType) => {
  return (
    <Head>
      <title>{`${title} | 계산쿤`}</title>
    </Head>
  );
};

export default Header;
