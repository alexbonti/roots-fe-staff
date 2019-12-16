import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";
import { Grid } from "@material-ui/core/";

import "react-quill/dist/quill.snow.css";
import { TextEditorContext, HomeContext } from "contexts/index";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [
      { list: "ordered" },
    ],
    [{ align: [] }],
    [{ color: [] }, { background: [] }]
  ]
};

export const TextEditor = (props) => {
  const { setDescription, setDescriptionOpportunity } = useContext(TextEditorContext);
  const {isEditOpportunity, isEditMyCompany} = useContext(HomeContext);
  const [nodeRedData] = useState("");

  const handleTextEditorChange = value => {
    
    if(props.data === "opportunity"){
      return setDescriptionOpportunity(value);
    }
    else {
      return setDescription(value);
    }
  };


  const toBeEdit = isEditOpportunity || isEditMyCompany ? props.editData : "";


  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} >
        <ReactQuill
          onChange={handleTextEditorChange}
          modules={{
            toolbar: modules.toolbar
          }}
          theme="snow"
          placeholder="Description ..."
          defaultValue={toBeEdit}
        />
        <div className="textEditorContent">
          <div>{ReactHtmlParser(nodeRedData)}</div>
        </div>
      </Grid>
    </Grid>
  );
};
