import React, { useState, useContext, useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField, Grid, Button, Container } from "@material-ui/core/";
import API from "../../helpers/api";
import { arrayfy } from "../../helpers/arrayfy";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import { EditOpportunityContext, HomeContext } from "../../contexts";
import JobFullView from "./JobFullView";
import { notify } from "../common/Notification";
import { AccessToken } from "../../contexts/helpers/";
import { TextEditor } from "./QuillEditor";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  root: {
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "white"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "55% !important",
    textAlign: "center !important"
  },
  textareaAutosize: {
    width: "70%",
    margin: "2%",
    height: "25vh !important"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  location: {
    width: "55% !important"
  },
  suggestion: {
    border: "1px solid grey",
    borderRadius: "2px",
    display: "block"
  },
  back: {
    margin: 15
  }
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
    tonalOffset: 0.2
  }
});

export function AddOpportunity() {
  const classes = useStyles();
  const {
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
    editSkills,
    setEditSkills,
    industryField,
    setIndustryField,
    location,
    setLocation
  } = useContext(EditOpportunityContext);

  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");
  const {
    isPreview,
    setIsPreview,
    styleEdit,
    setStyleEdit,
    setAddOpportunity,
    tabNumber
  } = useContext(HomeContext);

  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions);
  };

  const activePreview = () => {
    setIsPreview(true);
    setStyleEdit({ display: "none" });
    console.log(isPreview);
  };

  useEffect(() => {
    tabNumber !== 0 ? setAddOpportunity(false) : setAddOpportunity(true);
  }, [tabNumber, setAddOpportunity]);

  const submitToApi = () => {
    const data = {
      positionTitle: position,
      employmentType,
      skills: editSkills,
      seniority,
      startDate: new Date(start).toISOString(),
      endDate: new Date(stop).toISOString(),
      industryField,
      description,
      location
    };
    setAddOpportunity(false);
    API.postOpportunityDraft(data);
    notify("Job Saved");
    // window.location.reload();
  };

  const getSkill = event => {
    event.persist();
    setEditSkills(arrayfy(event.target.value));
  };

  const setSuggestions = event => {
    event.persist();
    setInputPosition(event.target.innerText);
    setLocation(event.target.innerText);
    setPositionSuggestions("");
  };

  const content = (
    <div>
      <div style={styleEdit}>
        <div>
          <Button
            className={classes.back}
            size="small"
            onClick={() => {
              setAddOpportunity(false);
            }}
          >
            {"< Back"}
          </Button>
          <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    required
                    id="standard-required"
                    label="Position Title"
                    placeholder="Position Title"
                    margin="normal"
                    onChange={event => {
                      setPosition(event.target.value);
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="standard-required"
                    label="Seniority"
                    placeholder="Seniority"
                    className={classes.textField}
                    margin="normal"
                    onChange={event => {
                      setSeniority(event.target.value);
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="standard-required"
                    label="Employement Type"
                    defaultValue=""
                    placeholder="Employement Type"
                    className={classes.textField}
                    margin="normal"
                    onChange={event => {
                      setEmploymentType(event.target.value);
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="Start "
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={event => {
                      setStart(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="End"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={event => {
                      setStop(event.target.value);
                    }}
                  />
                </Grid>
                <Container>
                  <Grid item xs={12}>
                    {" "}
                    <TextEditor />{" "}
                  </Grid>
                </Container>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="standard-required"
                    label="Required Skills"
                    placeholder="Write your skills separated by a coma"
                    className={classes.textField}
                    margin="normal"
                    onChange={event => {
                      event.preventDefault();
                      getSkill(event);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="standard-required"
                    label="Company Industry"
                    defaultValue=""
                    placeholder="Employement Type"
                    className={classes.textField}
                    margin="normal"
                    onChange={event => {
                      setIndustryField(event.target.value);
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      required
                      id="standard-required"
                      label="Location"
                      value={inputPosition}
                      placeholder="Employement Type"
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
                    Save For Later
                  </Button>
                </Grid>
              </Grid>
            </div>
          </ThemeProvider>
        </div>
      </div>
      {isPreview ? <JobFullView /> : ""}
    </div>
  );
  return content;
}
