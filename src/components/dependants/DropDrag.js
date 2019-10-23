import React, { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid } from "@material-ui/core/";
import { MyCompanyContext } from "../../contexts/";

export default function Accept() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const { companyLogo, tempLogo, setTempLogo } = useContext(MyCompanyContext);

  // const acceptedFilesItems = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const uploadImageImported = async data => {
        let file = new FormData();
        file.append("imageFile", data[0]);
        const imageData = await API.uploadImage(file);
        setTempLogo(imageData.response.data.data.imageFileURL.thumbnail);
      };
      uploadImageImported(acceptedFiles);
    }
  }, [acceptedFiles, setTempLogo]);

  let logo = tempLogo === '' ? companyLogo : tempLogo
  return (
    <Grid
      container
      direction="row"
      className="container"
      spacing={2}
      alignItems="center"
      {...getRootProps({ className: "dropzone" })}
      style={{border: "solid 1px #d0d0d0"}}
    >
      <Grid item xs={4} >
        <img src={logo} alt="backgroundImage" />
      </Grid>
      <Grid item xs={8}>
        <input {...getInputProps()} />
        <p>Drag and drop a logo image here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </Grid>
    </Grid>
  );
}
