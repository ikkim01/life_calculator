import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Image from "next/image";
import MENU from "../utils/data/MENU";
import useImgForm from "../utils/zustand/useImgForm";
import { convertBytes } from "../components/Function";
import { useDropFiles } from "../components/useDropFiles";

const indexNumber = 2;
const pageNumber = 1;

const ToJpeg = () => {
  const { heading, explain } = MENU[indexNumber].childMenu[pageNumber];
  const [onDrag, setOnDrag] = useState(false);
  // const [onDrop, setOnDrop] = useState(false);
  const {
    imgBlobs,
    handleImg,
    handleImgFromDrop,
    checkedFiles,
    handleChecked,
    handleAllChecked,
  } = useImgForm();
  const boxRef = useRef();
  const inputRef = useRef();

  // useEffect(() => {
  //   const uploadBox = boxRef.current;
  //   const input = inputRef.current;

  //   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;
  //     handleImgFromDrop(files);
  //   };

  //   const dropHandler = (event: React.DragEvent<HTMLTableElement>) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     const files = event.dataTransfer.files;
  //     handleImgFromDrop(files);
  //   };

  //   const dragOverHandler = (event: React.DragEvent<HTMLTableElement>) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };

  //   const dragOutsideHandler = (event: React.DragEvent<HTMLTableElement>) => {
  //     if (uploadBox.contains(event.target)) {
  //       onDrag && setOnDrag(false);
  //     } else {
  //       !onDrag && setOnDrag(true);
  //     }
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };
  //   const dragEnterHandler = (event: React.DragEvent<HTMLTableElement>) => {
  //     if (uploadBox.contains(event.target)) {
  //       !onDrag && setOnDrag(true);
  //     } else {
  //       onDrag && setOnDrag(false);
  //     }
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };

  //   uploadBox.addEventListener("drop", dropHandler as any);
  //   uploadBox.addEventListener("dragover", dragOverHandler as any);
  //   uploadBox.addEventListener("dragleave", dragOutsideHandler as any);
  //   uploadBox.addEventListener("dragenter", dragEnterHandler as any);
  //   input.addEventListener("change", changeHandler as any);

  //   return () => {
  //     uploadBox.removeEventListener("drop", dropHandler as any);
  //     uploadBox.removeEventListener("dragover", dragOverHandler as any);
  //     uploadBox.removeEventListener("dragleave", dragOutsideHandler as any);
  //     uploadBox.removeEventListener("dragenter", dragEnterHandler as any);
  //     input.removeEventListener("change", changeHandler as any);
  //   };
  // }, [boxRef, inputRef, handleImgFromDrop]);
  console.log(onDrag);
  useDropFiles(boxRef, inputRef, handleImgFromDrop);

  return (
    <main className="flex flex-col items-center space-y-7 pt-navTop">
      <Header title={heading} explain={explain} />
      <h3 className="text-center">이미지 파일을 JPEG로 변환합니다.</h3>
      <p className="px-5">
        이미지 파일을 업로드하여 JPEG로 변환하여 다운받아 보세요!
      </p>

      <label
        htmlFor="imgFile"
        className="px-14 py-5 rounded-lg border bg-fourthYellow text-center"
      >
        업로드하기
        <input
          type="file"
          className="opacity-0 w-0"
          id="imgFile"
          accept="image/*"
          multiple
          autoFocus
          onChange={handleImg}
          ref={inputRef}
        />
      </label>

      <table
        className={`border rounded-lg w-4/5 text-[12px] relative ${
          onDrag ? "bg-black" : ""
        }`}
        ref={boxRef}
      >
        <thead>
          <tr className="border p-3 h-[20px]">
            <th className="border px-3">
              <input
                type="checkbox"
                onChange={handleAllChecked}
                checked={
                  imgBlobs.length === checkedFiles.length &&
                  imgBlobs.length !== 0
                }
              />
            </th>
            <th className="border mobile:w-[100px] smallPc:w-[100px] pc:w-[200px]">
              미리보기
            </th>
            <th className="border">파일명</th>
            <th className="border">용량</th>
          </tr>
        </thead>
        <tbody>
          {imgBlobs.length !== 0 ? (
            imgBlobs.map((img, index) => {
              return (
                <tr
                  key={index}
                  className="border p-3 mobile:h-[100px] smallPc:h-[100px] pc:h-[200px]"
                >
                  <td className="border" align="center">
                    <input
                      type="checkbox"
                      checked={checkedFiles.includes(img.name)}
                      onChange={handleChecked}
                      name={img.name}
                    />
                  </td>
                  <td className="border" align="center">
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
                  <td className="border" align="center">
                    {img.previewFileData.name}
                  </td>
                  <td className="border" align="center">
                    {convertBytes(img.previewFileData.size)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="h-[500px] ">
              <td colSpan={4} align="center">
                {onDrag ? "+" : "파일을 업로드해주세요."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default ToJpeg;
