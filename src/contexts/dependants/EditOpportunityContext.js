import React, { createContext, useState } from "react";

export const EditOpportunityContext = createContext();

export const EditOpportunityProvider = props => {
  

  const [position, setPosition] = useState("");
  const [seniority, setSeniority] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [start, setStart] = useState("10 Jun. 2019");
  const [stop, setStop] = useState("30 Jun. 2030");
  const [description, setDescription] = useState("");
  const [editSkills, setEditSkills] = useState([""]);
  const [industryField, setIndustryField] = useState("");
  const [location, setLocation] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const { children } = props;

  return (
    <EditOpportunityContext.Provider
      value={{
        position,
        setPosition,
        seniority,
        setSeniority,
        employmentType,
        setEmploymentType,
        start,
        setStart,
        stop,
        setStop,
        description,
        setDescription,
        editSkills,
        setEditSkills,
        industryField,
        setIndustryField,
        location,
        setLocation,
        longitude,
        setLongitude,
        latitude,
        setLatitude
      }}
    >
      {children}
    </EditOpportunityContext.Provider>
  );
};
