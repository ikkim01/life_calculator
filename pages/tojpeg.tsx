import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import MENU from "../utils/data/MENU";
import useImgForm from "../utils/zustand/useImgForm";
import { convertBytes } from "../components/Function";

const indexNumber = 2;
const pageNumber = 0;

const ToJpeg = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];

  const {
    imgBlobs,
    handleImg,
    checkedFiles,
    handleChecked,
    handleAllChecked,
    onDrag,
    dragEnterHandler,
    dragOutsideHandler,
    dragOverHandler,
    dropHandler,
    downloadFiles,
  } = useImgForm();

  return (
    <main className="flex flex-col items-center space-y-7 pc:mt-navTop py-mainPadding">
      <Header title={heading} explain={explain} />
      <h1 className="text-center">이미지 파일을 JPEG로 변환합니다.</h1>
      <h2 className="px-5 text-[15px]">
        이미지 파일을 업로드하여 JPEG로 변환하여 다운받아 보세요!
      </h2>
      <div className="flex justify-end w-full px-5">
        <button name="inputFile">
          <label
            htmlFor="imgFile"
            className="w-full h-[50px] px-3 py-2 rounded-lg border bg-fourthYellow text-center text-[18px] cursor-pointer"
          >
            이미지 파일 업로드
          </label>
        </button>
      </div>
      <section
        className={`w-full relative pc:h-[600px] smallPc:h-[300px] mobile:h-[300px] overflow-y-auto ${
          onDrag ? "" : "border"
        }`}
        onDragEnter={dragEnterHandler}
      >
        <input
          type="file"
          className="opacity-0 w-0 absolute left-0 z-0"
          id="imgFile"
          accept="image/*"
          multiple
          autoFocus
          onChange={(event) => handleImg(event, "jpeg")}
        />
        {onDrag ? (
          <div
            className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-white z-1 border-4 border-dashed"
            onDragOver={dragOverHandler}
            onDragLeave={dragOutsideHandler}
            onDrop={(event) => dropHandler(event, "jpeg")}
          >
            <div className="flex space-x-3">
              <Image
                src="/img/plusIcon.svg"
                alt="plusIcon"
                width={30}
                height={30}
              />
              <p>Drag Here!</p>
            </div>
          </div>
        ) : (
          <table className="rounded-lg w-full text-[12px] relative">
            <thead className="sticky top-0 bg-white h-[40px] outline outline-gray-200">
              <tr>
                <th className="border-r" align="center">
                  <input
                    type="checkbox"
                    onChange={handleAllChecked}
                    checked={
                      imgBlobs.length === checkedFiles.length &&
                      imgBlobs.length !== 0
                    }
                    className="accent-black w-[14px] h-[14px]"
                  />
                </th>
                <th className="border-r mobile:w-[100px] smallPc:w-[100px] pc:w-[200px]">
                  미리보기
                </th>
                <th className="border-r">파일명</th>
                <th className="">용량</th>
              </tr>
            </thead>
            <tbody>
              {imgBlobs.length !== 0 ? (
                imgBlobs.map((img, index) => {
                  return (
                    <tr
                      key={index}
                      className="p-3 mobile:h-[100px] smallPc:h-[100px] pc:h-[200px] border-b"
                    >
                      <td className="border-r" align="center">
                        <input
                          type="checkbox"
                          checked={checkedFiles.includes(img.name)}
                          onChange={handleChecked}
                          name={img.name}
                          className="accent-black w-[14px] h-[14px]"
                        />
                      </td>
                      <td className="border-r" align="center">
                        <Image
                          src={img.preview}
                          alt={`업로드 이미지 ${index}`}
                          priority={true}
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="mobile:h-[100px] smallPc:h-[100px] pc:h-[200px] mobile:w-[100px] smallPc:w-[100px] pc:w-[200px]"
                        />
                      </td>
                      <td className="border-r" align="center">
                        {img.previewFileData.name}
                      </td>
                      <td className="" align="center">
                        {convertBytes(img.previewFileData.size)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="pc:h-[500px] mobile:h-[300px] smallPc:h-[300px] ">
                  <td colSpan={4} align="center">
                    <button name="inputFile">
                      <label
                        htmlFor="imgFile"
                        className="text-[20px] cursor-pointer"
                      >
                        파일을 업로드해주세요.
                      </label>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
      <div className="w-full flex justify-center">
        <button
          className="px-5 py-2 rounded-lg border bg-fourthYellow text-center text-[18px]"
          onClick={downloadFiles}
        >
          선택한 파일 다운로드
        </button>
      </div>
    </main>
  );
};

export default ToJpeg;
