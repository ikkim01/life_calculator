import React from "react";
import Header from "../components/Header";
import MENU from "../utils/data/MENU";
import useImgForm from "../utils/zustand/useImgForm";

const indexNumber = 2;
const pageNumber = 1;

const ToJpeg = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const { imgBlobs, handleImg } = useImgForm();

  return (
    <main className="flex flex-col items-center space-y-7 pt-navTop">
      <Header title={heading} explain={explain} />
      <h3 className="text-center">이미지 파일을 JPEG로 변환합니다.</h3>
      <p className="px-5">
        이미지 파일을 업로드하여 JPEG로 변환하여 다운받아 보세요!
      </p>
      <form className="w-full flex justify-center space-x-5">
        <label
          htmlFor="imgFile"
          className="border rounded-lg w-2/3 h-[50px] px-5 bg-white"
        >
          <input
            type="file"
            className="opacity-0 w-full"
            accept="image/*"
            multiple
            onChange={handleImg}
          />
        </label>
        <button
          type="button"
          className="px-8 py-2 rounded-lg border bg-fourthYellow"
        >
          변환하기
        </button>
      </form>
      {/* {imgBlobs !== null &&
        imgBlobs.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`업로드 이미지 ${index}`}>
              {img}
            </img>
          </div>
        ))} */}
    </main>
  );
};

export default ToJpeg;
