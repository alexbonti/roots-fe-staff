import React, { createContext, useState } from "react";

export const HomeContext = createContext();

export const HomeProvider = props => {
  const [addOpportunity, setAddOpportunity] = useState(false);
  const [jobView, setJobView] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isEditMyCompany, setIsEditMycompany] = useState(false);
  const [isEditOpportunity, setIsEditOpportunity] = useState(false);
  const [singleJobData, setSingleJobData] = useState("");
  const [styleEdit, setStyleEdit] = useState({ display: "block" });
  const [tabNumber, setTabNumber] = useState(0);
  const [applicantsInfo, setApplicantsInfo] = useState("");
  const [isSingle, setIsSingle] = useState({ view: false, id: "" });
  const [mainTitle, setMainTitle] = useState(
    "Let's create an opportunity and start making a difference"
  );
  const [isUpdated, setIsUpdated] = useState(true);
  const [cardId, setCardId] = useState("");

  const { children } = props;
  return (
    <HomeContext.Provider
      value={{
        addOpportunity,
        setAddOpportunity,
        jobView,
        setJobView,
        isPreview,
        setIsPreview,
        singleJobData,
        setSingleJobData,
        styleEdit,
        setStyleEdit,
        tabNumber,
        setTabNumber,
        applicantsInfo,
        setApplicantsInfo,
        isSingle,
        setIsSingle,
        isEditMyCompany,
        setIsEditMycompany,
        mainTitle,
        setMainTitle,
        isUpdated,
        setIsUpdated,
        isEditOpportunity, 
        setIsEditOpportunity,
        cardId, 
        setCardId
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
