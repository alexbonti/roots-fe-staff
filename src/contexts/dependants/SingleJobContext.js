import React, { createContext, useState } from "react";

export const SingleJobContext = createContext();

export const SingleJobProvider = props => {
  const [position, setPosition] = useState("");
  const [seniority, setSeniority] = useState("");
  const [employementType, setEmployementType] = useState("");
  const [start, setStart] = useState("");
  const [stop, setStop] = useState("");
  const [description, setDescription] = useState("");
  const [editSkills, setEditSkills] = useState("");
  const [industryField, setIndustryField] = useState("");
  const [location, setLocation] = useState("");
  const { children } = props;

  return (
    <SingleJobContext.Provider
      value={{
        position,
        setPosition,
        seniority,
        setSeniority,
        employementType,
        setEmployementType,
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
        setLocation
      }}
    >
      {children}
    </SingleJobContext.Provider>
  );
};
