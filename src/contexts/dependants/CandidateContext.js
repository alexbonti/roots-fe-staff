import React, { createContext, useState } from "react";

export const CandidateContext = createContext();

export const CandidateProvider = props => {
  const [candidateProfile, setCandidateProfile] = useState("");
  const [isSingleCandidate, setIsSingleCandidate] = useState({
    _: false,
    userDetails: ""
  });
  const { children } = props;

  return (
    <CandidateContext.Provider
      value={{
        candidateProfile,
        setCandidateProfile,
        isSingleCandidate,
        setIsSingleCandidate
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
