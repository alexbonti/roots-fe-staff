import React, { createContext, useState } from "react";

export const EditOpportunityContext = createContext();

export const EditOpportunityProvider = props => {
  

  const [position, setPosition] = useState("Administrator");
  const [seniority, setSeniority] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [start, setStart] = useState("10 Jun. 2019");
  const [stop, setStop] = useState("30 Jun. 2019");
  const [description, setDescription] = useState("");
  const [editSkills, setEditSkills] = useState(["React", "Javascript"]);
  const [industryField, setIndustryField] = useState("Information Technology (IT)");
  const [location, setLocation] = useState("Burwood, Melbourne");
  const [longitude, setLongitude] = useState(145.1136143);
  const [latitude, setLatitude] = useState(-37.8485326);
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
