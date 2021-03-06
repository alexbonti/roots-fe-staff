import React, { createContext, useState } from "react";

export const TextEditorContext = createContext();

export const TextEditorProvider = props => {

  const [description, setDescription] = useState("Your company description");
  const [descriptionOpportunity, setDescriptionOpportunity] = useState("Write here...");

  const { children } = props;
  return (
    <TextEditorContext.Provider
      value={{
        description,
        setDescription,
        descriptionOpportunity,
        setDescriptionOpportunity,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};
