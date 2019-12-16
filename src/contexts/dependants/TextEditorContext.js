import React, { createContext, useState } from "react";

export const TextEditorContext = createContext();

export const TextEditorProvider = props => {
  const textDescriptionDumb = ("");

  const [description, setDescription] = useState(textDescriptionDumb);
  const [descriptionOpportunity, setDescriptionOpportunity] = useState("");

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
