import React, { useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField, Grid, Button } from "@material-ui/core/";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import API from "../../helpers/api";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import {
  MyCompanyContext,
  HomeContext,
  TextEditorContext,
} from "../../contexts";
import { notify } from "../common/Notification";
import { AccessToken } from "../../contexts/helpers/";
import MyDropzone from "./DropDrag";
import { TextEditor } from "./QuillEditor";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  root: {
    backgroundColor: "white",
    marginTop: "1vh",
    borderRadius: "10px",
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: "100%",
  },
  textareaAutosize: {
    width: "70%",
    margin: "2%",
    height: "25vh !important",
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  location: {
    //width: "55% !important",
  },
  suggestion: {
    border: "1px solid grey",
    borderRadius: "2px",
    display: "block",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export function EditMyCompany() {
  const classes = useStyles();

  //-------------------context
  const { companyId, tempLogo, setIsUploaded } = useContext(MyCompanyContext);

  const { description } = useContext(TextEditorContext);
  const {
  
    styleEdit,
    setIsEditMycompany,
    setMainTitle,
  } = useContext(HomeContext);

  //--------------------- usestates
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");

  //--------------------- functions
  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions.suggestions);
  };

  // const activePreview = () => {
  //   setIsPreview(true);
  //   setStyleEdit({ display: "none" });
  // };

  if (!companyId) {
    setMainTitle("First let's create your Company profile");
  }

  const submitToApi = async accesstoken => {
    const data = {
      companyName,
      companyLogo: tempLogo,
      location: companyLocation,
      companyDescription: description,
      companyIndustry,
    };
    const data2 = {
      companyId,
      companyName,
      companyLogo: tempLogo,
      location: companyLocation,
      companyDescription: description,
      companyIndustry,
    };

    if (companyId !== null && companyId !== "") {
      console.log(companyId);
      const updateDataCompany = await API.updateCompanyDetails(
        data2,
        accesstoken
      );
      notify("Company Details Saved");
      console.log("update company details", updateDataCompany);
      closeEdit();
      setIsUploaded(true);
    } 
    else {
      const postDataCompany = await API.postMyCompanyDetails(data, accesstoken);
      notify("Company Details Created");
      console.log(postDataCompany);
      closeEdit();
      setIsUploaded(true);
    }
  };

  const setSuggestions = event => {
    event.persist();
    setInputPosition(event.target.innerText);
    setCompanyLocation(event.target.innerText);
    setPositionSuggestions("");
  };

  const closeEdit = () => {
    setIsEditMycompany(false);
  };

  return (
    <Grid style={styleEdit}>
      <ThemeProvider theme={theme}>
        {/* BUTTON */}
        <Grid container alignContent="flex-start">
          <Button onClick={closeEdit}> {"<"} Back</Button>
        </Grid>

        {/* //MAIN center the page */}
        <Grid container direction="column" alignItems="center">
          {/* root gives size  */}
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="row"
            className={classes.root}
            spacing={3}
            item
            xs={8}
          >
            {/* company name */}
            <Grid item xs={8}>
              <TextField
                // className={classes.textField}
                required
                fullWidth
                id="standard-required"
                label="Company Name"
                placeholder="Company Name"
                margin="normal"
                onChange={event => {
                  setCompanyName(event.target.value);
                }}
              />
            </Grid>

            {/* Logo upload */}
            <Grid item xs={8}>
              <MyDropzone />
            </Grid>

            {/* industry */}
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="standard-required"
                label="Company Industry"
                defaultValue=""
                placeholder="Company Industry  Field "
                // className={classes.textField}
                margin="normal"
                onChange={event => {
                  setCompanyIndustry(event.target.value);
                }}
              />{" "}
            </Grid>

            {/* location */}
            <Grid item xs={8}>
              <TextField
                required
                id="standard-required"
                label="Location"
                value={inputPosition}
                fullWidth
                placeholder="Company Location"
                className={classes.textField}
                margin="normal"
                onChange={event => {
                  event.preventDefault();
                  autoFill(event);
                }}
              />
              <div>
                {positionSuggestions !== null &&
                positionSuggestions !== undefined &&
                positionSuggestions !== "" ? (
                  <div className={classes.suggestion}>
                    {positionSuggestions.map(suggestion => {
                      return (
                        <div
                          key={Math.random()}
                          onClick={event => {
                            event.preventDefault();
                            setSuggestions(event);
                          }}
                        >
                          {suggestion.label}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Grid>

            {/* description */}
            <Grid item xs={8}>
              <TextEditor />{" "}
            </Grid>

            {/* Buttons */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="center"
              item
              xs={8}
              direction="row"
            >
              <Grid
                item
                xs={6}
                container
                direction="column"
                alignContent="center"
                spacing={2}
              >
                {/* <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      activePreview();
                    }}
                    style={{ width: "100%" }}
                  >
                    Preview
                  </Button>
                </Grid> */}
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      submitToApi(AccessToken);
                    }}
                    variant="contained"
                    color="primary"
                    style={{ width: "100%" }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* {isPreview ? <MyCompanyFullView  /> : ""} */}
    </Grid>
  );
}
