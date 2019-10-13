/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { createTypeOf } from "../../../node_modules/typescript/lib/typescript";

export default function Accept() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });
  const [imgUrl, setImgUrl] = useState("");

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const uploadImageImported = async data => {
        let file = new FormData();
        file.append("imageFile", data[0]);
        const imageData = await API.uploadImage(file);
        setImgUrl(imageData);
      };
      uploadImageImported(acceptedFiles);
    }
  }, [acceptedFiles]);

  useEffect(() => {}, [imgUrl]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag and drop a logo image here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <img src={imgUrl} alt="" />
        <ul>{acceptedFilesItems}</ul>
      </aside>
    </section>
  );
}
