import React, { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid } from "@material-ui/core/";
import { MyCompanyContext } from "../../contexts/";
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';

export default function Accept() {

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const { tempLogo, setTempLogo } = useContext(MyCompanyContext);


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

  // let icon = companyLogo === "https://s3.au-syd.cloud-object-storage.appdomain.cloud/refugee-bucket/image/profilePicture/thumb/Thumb_Profile_lFu6zRW9TBxB.png" ? <CameraAltOutlinedIcon fontSize="large" /> : <img src={""} alt="backgroundImage" /> ;


  let icon = tempLogo !== "" ? <img src={tempLogo} alt="backgroundImage" style={{ height: "100%" }} /> : <CameraAltOutlinedIcon fontSize="large" />;

  return (
    <Grid
      container
      direction="row"
      className="container"
      justify="center"
      alignItems="center"
      {...getRootProps({ className: "dropzone" })}
      style={{ border: " 1px  dashed #d0d0d0", minHeight: "15vh" }}
    >
      <Grid item xs={10} style={{ textAlign: "center" }}  >
        {icon}
        <input {...getInputProps()} />
      </Grid>

    </Grid>
  );
}