import React, { createContext, useState } from "react";

export const MyCompanyContext = createContext();

export const MyCompanyProvider = props => {
  const [companyName, setCompanyName] = useState("My Company");
  const [companyLogo, setCompanyLogo] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCK4URjbR3TE8cSfY1pYy4IGhl6nOdQ9C9257OafzyP8KySLZwXA"
  );
  const [
    companyDescription,
    setCompanyDescription
  ] = useState(`<h2>Tips for Writing an Effective Company Profile</h2>

  <ul>
    <li>Begin with a focused company introduction that tells about the management style of your company.</li>
    <li>Avoid using idioms and phrases. State the mission statement as clearly as possible.</li>
    <li>Define your company&#39;s policy in catchy terms keeping your target customers in mind.</li>
    <li>Use appropriate format and style as suggested by authority sources.</li>
    <li>Revise your company profile from time to time and keep it up-to-date.</li>
    <li>Understand the requirements of the business directory you are writing your company profile for. Some directories include everything in one place, while others provide additional fields for certain information like location, category and amenities.</li>
    <li>Write to inform rather than to impress. Make sure you provide all the details your customer would need to contact you.</li>
    <li>Align the description with the tone and brand of your company.</li>
    <li>After reading your description, customers should be able to visualize an image of your company rather than remembering a bulleted list of details.</li>
    <li>Customize your company profile for different <a href="https://smallbiztrends.com/2015/01/find-niche-directories-that-boost-seo.html" target="_blank">niche-specific directories</a>. Instead of copying and pasting the same description everywhere, try to highlight those aspects of your business which are most relevant to the platform.</li>
    <li>Always remember your target audience while writing the company description. Think about their requirements and preferences.</li>
    <li>Try to make your business stand out from your competition.</li>
  </ul>`);
  const [companyIndustry, setCompanyIndustry] = useState("Human Resources");
  const [companyLocation, setCompanyLocation] = useState("Melbourne");

  const { children } = props;
  return (
    <MyCompanyContext.Provider
      value={{
        companyName,
        setCompanyName,
        companyLogo,
        setCompanyLogo,
        companyDescription,
        setCompanyDescription,
        companyIndustry,
        setCompanyIndustry,
        companyLocation,
        setCompanyLocation
      }}
    >
      {children}
    </MyCompanyContext.Provider>
  );
};
