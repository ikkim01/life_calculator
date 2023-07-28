import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterComponent = () => {
  return (
    <footer className="text-[15px] flex justify-center space-x-3 items-center pt-10 w-full flex-wrap">
      <p>Copyright 2023. 계산쿤. All rights reserved.</p>
      <address className="flex items-center space-x-3">
        <p>Contact Me</p>
        <Link href="mailto:smilezerg12@gmail.com" target="_blank">
          <Image
            src="/img/mailIcon.svg"
            alt="제작자에게 메일ㅇ"
            width={20}
            height={20}
            className="pb-1"
          />
        </Link>
      </address>
    </footer>
  );
};

export default FooterComponent;
