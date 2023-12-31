import React from "react";
import Image from "next/image";

const Custom404 = () => {
  return (
    <main className="w-full h-full pc:mt-navTop py-mainPadding">
      <article className="py-20 flex flex-col items-center justify-center space-y-10">
        <Image
          src="/img/404Icon.svg"
          alt="404Image"
          width={200}
          height={200}
          priority={true}
        />
        <p className="text-ml text-center">
          잘못된 접근입니다.
          <br /> 주소를 다시 확인해주세요.
        </p>
      </article>
    </main>
  );
};

export default Custom404;
