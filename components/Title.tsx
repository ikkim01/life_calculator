import React from "react";
interface propsType {
  title: string;
}
const Title = ({ title }: propsType) => {
  return (
    <h1 className="w-full flex items-center justify-center py-5 border-b text-[35px] text-grey bg-fourthYellow">
      {title}
    </h1>
  );
};

export default Title;
