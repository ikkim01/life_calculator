import React, { useEffect } from "react";

export function useDropFiles(
  boxRef:
    | React.MutableRefObject<null>
    | React.MutableRefObject<HTMLTableElement>,
  inputRef:
    | React.MutableRefObject<null>
    | React.MutableRefObject<HTMLInputElement>,
  handler: (files: FileList) => void
) {
  useEffect(() => {
    const uploadBox = boxRef.current;
    const input = inputRef.current;

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      handler(files);
    };

    const dropHandler = (event: React.DragEvent<HTMLTableElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      handler(files);
    };

    const dragOverHandler = (event: React.DragEvent<HTMLTableElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    uploadBox.addEventListener("drop", dropHandler as any);
    uploadBox.addEventListener("dragover", dragOverHandler as any);
    input.addEventListener("change", changeHandler as any);

    return () => {
      uploadBox.removeEventListener("drop", dropHandler as any);
      uploadBox.removeEventListener("dragover", dragOverHandler as any);
      input.removeEventListener("change", changeHandler as any);
    };
  }, [boxRef, inputRef, handler]);
}
