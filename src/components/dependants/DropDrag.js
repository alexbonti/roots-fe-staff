import React, { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid } from "@material-ui/core/";
import { MyCompanyContext } from "../../contexts/";

export default function Accept() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const { companyLogo, setCompanyLogo } = useContext(MyCompanyContext);

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
        setCompanyLogo(imageData.response.data.data.imageFileURL.thumbnail);
      };
      uploadImageImported(acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <Grid
      container
      item
      xs={7}
      direction="column"
      className="container"
      alignItems="center"
      style={{backgroundImage: `url(${companyLogo})`, backgroundRepeat: "no-repeat", margin: "0 auto", height: "30vh", border: "solid 1px #d0d0d0"}}
    >
      <Grid container item xs={12} alignItems="center" justify="center" direction="column" {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Grid item xs={6}>
        <p>Drag and drop a logo image here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <aside>
          <ul>{acceptedFilesItems}</ul>
        </aside>
      </Grid> */}
    </Grid>
  );
}
