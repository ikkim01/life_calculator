import React from "react";
import { create } from "zustand";
import { convertImg } from "../../components/Function";

type imgType = {
  previewFileData: File;
  preview: string;
  name: string;
  fileData: File;
};

interface menuType {
  imgBlobs: imgType[];
  handleImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImgFromDrop: (files: FileList) => void;
  checkedFiles: string[];
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAllChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useImgForm = create<menuType>((set) => ({
  imgBlobs: [],
  handleImg: async (event) => {
    const files = event.target.files;
    const fileArr = [];

    const awaitFileArr = await Promise.all(
      Array.from(files).map(async (file) => {
        const convertFile = await convertImg(file, "jpeg");
        return { convertFile, file };
      })
    );

    awaitFileArr.map((files: { convertFile: File; file: File }) => {
      const fileURL = URL.createObjectURL(files.file);

      fileArr.push({
        previewFileData: files.file,
        preview: fileURL,
        name: files.convertFile.name,
        fileData: files.convertFile,
      });
    });

    set((state) => {
      const copyArr = [...state.imgBlobs];

      return {
        imgBlobs: copyArr.length === 0 ? fileArr : copyArr.concat(fileArr),
      };
    });
  },
  handleImgFromDrop: async (files) => {
    const fileArr = [];

    const awaitFileArr = await Promise.all(
      Array.from(files).map(async (file) => {
        const convertFile = await convertImg(file, "jpeg");
        return { convertFile, file };
      })
    );

    awaitFileArr.map((files: { convertFile: File; file: File }) => {
      const fileURL = URL.createObjectURL(files.file);

      fileArr.push({
        previewFileData: files.file,
        preview: fileURL,
        name: files.convertFile.name,
        fileData: files.convertFile,
      });
    });

    set((state) => {
      const copyArr = [...state.imgBlobs];

      return {
        imgBlobs: copyArr.length === 0 ? fileArr : copyArr.concat(fileArr),
      };
    });
  },
  checkedFiles: [],
  handleChecked: (event) =>
    set((state) => {
      const copyArr = [...state.checkedFiles];
      const { name } = event.currentTarget;

      copyArr.includes(name)
        ? copyArr.splice(copyArr.indexOf(name), 1)
        : copyArr.push(name);
      return { checkedFiles: copyArr };
    }),
  handleAllChecked: (event) =>
    set((state) => {
      const { checked } = event.currentTarget;
      const checkedArr = state.imgBlobs.map((img) => img.name);
      return { checkedFiles: checked ? checkedArr : [] };
    }),
}));

export default useImgForm;
