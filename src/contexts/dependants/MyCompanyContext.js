import React, { createContext, useState } from "react";

export const MyCompanyContext = createContext();

export const MyCompanyProvider = props => {

  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("My Company");
  const [companyLogo, setCompanyLogo] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/refugee-bucket/image/profilePicture/thumb/Thumb_Profile_lFu6zRW9TBxB.png");
  const [companyDescription, setCompanyDescription] = useState("");
  const [tempLogo, setTempLogo] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("Human Resources");
  const [companyLocation, setCompanyLocation] = useState("Melbourne");
  const [dataMyCompany, setDataMyCompany] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const { children } = props;
  return (
    <MyCompanyContext.Provider
      value={{
        companyId,
        setCompanyId,
        companyName,
        setCompanyName,
        companyLogo,
        setCompanyLogo,
        companyDescription,
        setCompanyDescription,
        companyIndustry,
        setCompanyIndustry,
        companyLocation,
        setCompanyLocation,
        tempLogo,
        setTempLogo,
        dataMyCompany,
        setDataMyCompany,
        isUploaded,
        setIsUploaded
      }}
    >
      {children}
    </MyCompanyContext.Provider>
  );
};
