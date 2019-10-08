import React, { useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField, Grid, Button } from "@material-ui/core/";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import API from "../../helpers/api";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import { MyCompanyContext, HomeContext } from "../../contexts";
import JobFullView from "./JobFullView";
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
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "55% !important",
    textAlign: "center !important",
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
    width: "55% !important",
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
  const {
    companyName,
    setCompanyName,
    // companyLogo,
    // setCompanyLogo,
    companyDescription,
    // setCompanyDescription,
    companyField,
    setCompanyField,
    companyLocation,
    setCompanyLocation,
  } = useContext(MyCompanyContext);

  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");
  const {
    isPreview,
    setIsPreview,
    styleEdit,
    setStyleEdit,
    // setAddOpportunity
  } = useContext(HomeContext);

  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions);
  };

  const activePreview = () => {
    setIsPreview(true);
    setStyleEdit({ display: "none" });
  };

  const submitToApi = () => {
    const data = {
      companyName,
      companyField,
      companyLocation,
      companyDescription,
    };

    API.postMyCompanyDetails(data);
    notify("Company Details Saved");
  };

  const setSuggestions = event => {
    event.persist();
    setInputPosition(event.target.innerText);
    setCompanyLocation(event.target.innerText);
    setPositionSuggestions("");
  };

  return (
    <div>
      <div style={styleEdit}>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              {/* company name */}
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  required
                  id="standard-required"
                  label="Company Name"
                  placeholder="Company Name"
                  margin="normal"
                  onChange={event => {
                    setCompanyName(event.target.value);
                  }}
                />
                {companyName}
              </Grid>

              {/* company logo */}
              <Grid item xs={12}>
                <MyDropzone />
              </Grid>

              {/* industry */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="standard-required"
                  label="Company Industry"
                  defaultValue=""
                  placeholder="Company Industry  Field "
                  className={classes.textField}
                  margin="normal"
                  onChange={event => {
                    setCompanyField(event.target.value);
                  }}
                />{" "}
              </Grid>

              {/* location */}
              <Grid item xs={12}>
                <div>
                  <TextField
                    required
                    id="standard-required"
                    label="Location"
                    value={inputPosition}
                    placeholder="Company Location"
                    className={classes.textField}
                    margin="normal"
                    onChange={event => {
                      event.preventDefault();
                      autoFill(event);
                    }}
                  />{" "}
                  {/* prettier-ignore */}
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
                                {suggestion.address.country},{" "}
                                {suggestion.address.city},{" "}
                                {suggestion.address.state}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                  </div>
                  <div />
                </div>
              </Grid>

              {/* description */}
              <Grid item xs={12}>
                <TextEditor />{" "}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    activePreview();
                  }}
                >
                  Preview
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    submitToApi(AccessToken);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </div>
        </ThemeProvider>
      </div>

      {isPreview ? <JobFullView /> : ""}
    </div>
  );
}
