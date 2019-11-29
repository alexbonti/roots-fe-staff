import React, { createContext, useState } from "react";

export const EditOpportunityContext = createContext();

export const EditOpportunityProvider = props => {
  const textDescriptionDumb = `<h4>HTML Toolbar</h4><p>You can also supply your own HTML/JSX toolbar with custom elements that are not part of the Quill theme.</p><p>See this example live on Codepen:&nbsp;<a href="https://codepen.io/alexkrolick/pen/gmroPj?editors=0010" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;">Custom Toolbar Example</a></p><p>Example Code</p><h3><br></h3><h3>Custom Formats</h3><p>The component has two types of formats:</p><ol><li>The default&nbsp;<a href="http://quilljs.com/docs/formats/" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;">Quill formats</a>&nbsp;that are enabled/disabled using the&nbsp;<code style="color: rgb(3, 102, 214); background-color: rgba(27, 31, 35, 0.05);"><a href="https://github.com/zenoamaro/react-quill#props" target="_blank">formats</a></code><a href="https://github.com/zenoamaro/react-quill#props" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;">&nbsp;prop</a>. All formats are enabled by default.</li><li>Custom formats created using Parchment and registered with your component's Quill instance</li></ol><p>Example Code</p><h3><br></h3><h3>Custom editing area</h3><p>If you instantiate ReactQuill without children, it will create a&nbsp;<code style="background-color: rgba(27, 31, 35, 0.05);">&lt;div&gt;</code>&nbsp;for you, to be used as the editing area for Quill. If you prefer, you can specify your own element for ReactQuill to use. Note that&nbsp;<code style="background-color: rgba(27, 31, 35, 0.05);">&lt;textarea&gt;</code>s are not supported by Quill at this time.</p><p>Note: Custom editing areas lose focus when using React 16 as a peer dep at this time (<a href="https://github.com/zenoamaro/react-quill/issues/309" target="_blank" style="color: rgb(3, 102, 214); background-color: transparent;">bug</a>).</p>`;

  const [position, setPosition] = useState("Administrator");
  const [seniority, setSeniority] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [start, setStart] = useState("10 Jun. 2019");
  const [stop, setStop] = useState("30 Jun. 2019");
  const [description, setDescription] = useState(textDescriptionDumb);
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
