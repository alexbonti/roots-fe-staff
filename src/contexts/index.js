import React from "react";
import { LoginContext, LoginProvider } from "./common/LoginContext";
import { LayoutContext, LayoutProvider } from "./common/LayoutContext";
import { HomeContext, HomeProvider } from "./dependants/HomeContext";
import {
  EditOpportunityContext,
  EditOpportunityProvider
} from "./dependants/EditOpportunityContext";
import {
  MyCompanyContext,
  MyCompanyProvider
} from "./dependants/MyCompanyContext";
import {
  CandidateContext,
  CandidateProvider
} from "./dependants/CandidateContext";

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  HomeContext,
  HomeProvider,
  EditOpportunityContext,
  EditOpportunityProvider,
  MyCompanyContext,
  MyCompanyProvider,
  CandidateContext,
  CandidateProvider
};

export const ContextManager = props => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        <HomeProvider>
          <MyCompanyProvider>
            <CandidateProvider>
              <EditOpportunityProvider>{children}</EditOpportunityProvider>
            </CandidateProvider>
          </MyCompanyProvider>
        </HomeProvider>
      </LoginProvider>
    </LayoutProvider>
  );
};
