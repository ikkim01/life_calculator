import React from "react";
import Image from "next/image";
import Link from "next/link";

const FooterComponent = () => {
  return (
    <footer className="text-s flex justify-center space-x-3 items-center pt-10 w-full flex-wrap">
      <p>Copyright 2023. 계산쿤. All rights reserved.</p>
      <address className="flex items-center space-x-3">
        <p>Contact Me</p>
        <Link href="mailto:smilezerg12@gmail.com" target="_blank">
          <Image
            src="/img/mailIcon.svg"
            alt="제작자에게 메일"
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
