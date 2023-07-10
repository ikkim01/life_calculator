import axios from "axios";
import React from "react";
import { create } from "zustand";
// import { convertImg } from "../../components/Function";

interface menuType {
  imgBlobs: any[] | null;
  handleImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useImgForm = create<menuType>((set) => ({
  imgBlobs: null,
  handleImg: (event) =>
    set((state) => {
      //   const files = event.target.files;
      //   const copyArr = state.imgBlobs === null ? [] : [...state.imgBlobs];

      //   if (files.length === 1) {
      //     const img = files[0];

      //     const data = convertImg(img, "jpeg");
      //     data.then((res) => copyArr.push(URL.createObjectURL(res)));
      //   } else {
      //     const promises = Array.from(files).map((file) =>
      //       convertImg(file, "jpeg")
      //     );
      //     Promise.all(promises)
      //       .then((results) => {
      //         copyArr.concat(results);
      //       })
      //       .catch((error) => {
      //         console.error(error);
      //       });
      //   }

      return { imgBlobs: [] };
    }),
}));

export default useImgForm;
