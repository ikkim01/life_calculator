import React from "react";
import { create } from "zustand";
import { convertImg } from "../../components/Function";

type imgType = {
  previewFileData: File;
  preview: string;
  name: string;
  fileData: File;
};

type State = {
  imgBlobs: imgType[];
  checkedFiles: string[];
  onDrag: boolean;
};

type Actions = {
  handleImg: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "jpeg" | "jpg"
  ) => void;
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAllChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dropHandler: (event: React.DragEvent, type: "jpeg" | "jpg") => void;
  dragOverHandler: (event: React.DragEvent) => void;
  dragOutsideHandler: (event: React.DragEvent) => void;
  dragEnterHandler: (event: React.DragEvent) => void;
  downloadFiles: () => void;
  resetState: () => void;
};

const initialState: State = {
  imgBlobs: [],
  checkedFiles: [],
  onDrag: false,
};

const useImgForm = create<State & Actions>((set) => ({
  imgBlobs: [],
  handleImg: async (event, type) => {
    const files = event.target.files;
    const fileArr = [];

    const awaitFileArr = await Promise.all(
      Array.from(files).map(async (file) => {
        const convertFile = await convertImg(file, type);
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
  onDrag: false,
  dropHandler: async (event, type) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    const fileArr = [];

    const awaitFileArr = await Promise.all(
      Array.from(files).map(async (file) => {
        const convertFile = await convertImg(file, type);
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
        onDrag: false,
      };
    });
  },
  dragOverHandler: (event) =>
    set((state) => {
      event.preventDefault();
      event.stopPropagation();
      return {};
    }),
  dragOutsideHandler: (event) =>
    set((state) => {
      event.preventDefault();
      event.stopPropagation();
      return { onDrag: false };
    }),
  dragEnterHandler: (event) =>
    set((state) => {
      event.preventDefault();
      event.stopPropagation();
      return { onDrag: true };
    }),
  downloadFiles: () =>
    set((state) => {
      if (state.checkedFiles.length === 0) {
        alert("최소 한개의 파일을 선택해주세요.");
      } else {
        state.checkedFiles.map((file) => {
          const findFile = state.imgBlobs.find((blob) => blob.name === file);
          const link = document.createElement("a");
          link.setAttribute("download", findFile.name);
          link.href = URL.createObjectURL(findFile.fileData);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
      }
      return {};
    }),
  resetState: () => set(initialState),
}));

export default useImgForm;
