import React, { createContext, useState } from "react";

export const MyCompanyContext = createContext();

export const MyCompanyProvider = props => {

  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("My Company");
  const [companyLogo, setCompanyLogo] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/refugee-bucket/image/profilePicture/thumb/Thumb_Profile_lFu6zRW9TBxB.png");
  const [companyDescription, setCompanyDescription] = useState(`<div id="mntl-sc-block_1-0-2" class="comp mntl-sc-block mntl-sc-block-html">
  <p>The <a href="http://www.business-plans-guide.com/company-description-example.html" data-component="link" data-source="inlineLink" data-type="externalLink" data-ordinal="1" rel="nofollow">company description</a> of your business plan describes the vision and direction of the company so potential lenders and partners can develop an accurate impression about who you are.</p>
  </div>
  <div id="mntl-sc-block_1-0-3" class="comp mntl-sc-block mntl-sc-block-adslot mntl-block"> </div>
  <a class="heading-toc" id="what-to-include"></a> <h3 id="mntl-sc-block_1-0-4" class="comp mntl-sc-block mntl-sc-block-heading"> <span class="mntl-sc-block-heading__text"> What to Include </span> </h3>
  <div id="mntl-sc-block_1-0-5" class="comp mntl-sc-block mntl-sc-block-html">
  <p>The exact elements included in your company description can vary, but some elements are more common than others and most likely should be part of the section:</p>
  </div>
  <div id="mntl-sc-block_1-0-6" class="comp mntl-sc-block mntl-sc-block-adslot mntl-block"> </div>
  <div id="mntl-sc-block_1-0-7" class="comp mntl-sc-block mntl-sc-block-html">
  <ul><li><strong>Company name</strong>: The official name of your business as registered in the state where you do business.</li><li><strong>Type of business structure</strong>: Sole proprietorship, LLC, partnership or corporation.</li><li><strong>Ownership/<a href="https://www.thebalancesmb.com/management-section-of-business-plan-2947028" data-component="link" data-source="inlineLink" data-type="internalLink" data-ordinal="1">management team</a></strong>: Names of the key people behind the company.</li><li><strong>Location</strong>: Where is the company headquartered?</li><li><a href="https://www.thebalancesmb.com/writing-business-plan-company-history-1200837" data-component="link" data-source="inlineLink" data-type="internalLink" data-ordinal="2"><strong>Company history</strong></a>: When was the business started, what inspired you to start the business, what need does your company fulfill?</li><li><a href="https://www.thebalancesmb.com/how-to-write-a-meaningful-mission-statement-2951205" data-component="link" data-source="inlineLink" data-type="internalLink" data-ordinal="3"><strong>Mission statement</strong></a>: A clear statement that represents the purpose of your company.</li><span class="mntl-sc-block-adslot mntl-sc-block-adslot-inline"></span><li><strong>Products/services and <a href="https://www.thebalancesmb.com/how-to-write-a-small-business-marketing-plan-2951749" data-component="link" data-source="inlineLink" data-type="internalLink" data-ordinal="4">target market</a></strong>: A brief overview of what you plan to sell and to whom.</li><li><strong>Objectives</strong>: An outline of what you want to accomplish in the immediate future based on the data in the rest of the business plan as well as future growth goals.</li><li><a href="https://www.thebalancesmb.com/how-to-write-a-vision-statement-2947992" data-component="link" data-source="inlineLink" data-type="internalLink" data-ordinal="5"><strong>Vision statement</strong></a>: A statement about how you envision the future of the company.</li></ul>
  </div>
  <div id="mntl-sc-block_1-0-8" class="comp mntl-sc-block mntl-sc-block-adslot mntl-block"> </div>
  <a class="heading-toc" id="writing-your-company-description"></a> <h3 id="mntl-sc-block_1-0-9" class="comp mntl-sc-block mntl-sc-block-heading"> <span class="mntl-sc-block-heading__text"> Writing Your Company Description </span> </h3>
  <div id="mntl-sc-block_1-0-10" class="comp mntl-sc-block mntl-sc-block-html">
  <p>Once you&#39;ve organized the key information that you want to include, you need to write the section in a way that will be appealing to readers. Follow five steps to help create a successful company description.</p>
  </div>`);
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
