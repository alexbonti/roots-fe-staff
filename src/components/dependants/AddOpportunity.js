import React, { useState, useContext, useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField, Grid, Button, MenuItem } from "@material-ui/core/";
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
    flexWrap: "wrap",
  },
  root: {
    textAlign: "center",
    backgroundColor: "white",
    width: "80vw",
    margin: "1vh auto",
    borderRadius: "10px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "58% !important",
    textAlign: "left !important",
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
    width: "58% !important",
  },
  suggestion: {
    border: "1px solid grey",
    borderRadius: "2px",
    display: "block",
  },
  back: {
    margin: 15,
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

export function AddOpportunity(props) {
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
    setLocation,
    longitude,
    setLongitude,
    latitude,
    setLatitude,
  } = useContext(EditOpportunityContext);

  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");

  const {
    isPreview,
    setIsPreview,
    styleEdit,
    setStyleEdit,
    setAddOpportunity,
    tabNumber,
    setIsUpdated,
    singleJobData,
    isEditOpportunity,
  } = useContext(HomeContext);

  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions.suggestions);
  };

  const activePreview = () => {
    setIsPreview(true);
    setStyleEdit({ display: "none" });
  };


  useEffect(() => {
    tabNumber !== 0 ? setAddOpportunity(false) : setAddOpportunity(true);
  }, [tabNumber, setAddOpportunity]);

  const submitToApi = () => {
    if (props.data) {
      const data = {
        positionTitle: position,
        employmentType,
        skills: editSkills,
        seniority,
        startDate: new Date(start).toISOString(),
        endDate: new Date(stop).toISOString(),
        industryField,
        description,
        location,
        latitude,
        longitude,
      };
      setAddOpportunity(false);
      API.postOpportunityDraft(data);
      setIsUpdated(true);
      notify("Job Saved");
    } else {
      notify("Please first complete your Company profile");
    }
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

  const getLongLat = async input => {
    const data = await API.getLatLong(input.locationId);
    setLatitude(data.response.latitude);
    setLongitude(data.response.longitude);
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
              <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    required
                    defaultValue={isEditOpportunity ? singleJobData.positionTitle : ""}
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
                    id="free-solo-demo2"
                    select
                    defaultValue={isEditOpportunity ? singleJobData.seniority : ""}
                    value={seniority}
                    helperText="Please select Seniority Level"
                    margin="normal"
                    className={classes.textField}
                    placeholder="Seniority"
                    onChange={e => setSeniority(e.target.value)}
                  >
                    {seniorityOption.map(option => (
                      <MenuItem key={Math.random()} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="free-solo-demo2"
                    defaultValue={isEditOpportunity ? singleJobData.employmentType : ""}
                    select
                    value={employmentType}
                    margin="normal"
                    className={classes.textField}
                    placeholder="Seniority"
                    onChange={e => setEmploymentType(e.target.value)}
                  >
                    {type.map(option => (
                      <MenuItem key={Math.random()} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="Start "
                    type="date"
                    defaultValue={isEditOpportunity ? singleJobData.startDate : ""}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
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
                    defaultValue={isEditOpportunity ? singleJobData.endDate : ""}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={event => {
                      setStop(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={7}>
                  {" "}
                  <TextEditor data={"opportunity"} editData={singleJobData.description}/>{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="standard-required"
                    defaultValue={isEditOpportunity ? singleJobData.skills : ""}
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
                    id="free-solo-demo2"
                    select
                    value={industryField}
                    helperText="Select Industry field"
                    margin="normal"
                    className={classes.textField}
                    onChange={e => setIndustryField(e.target.value)}
                  >
                    {jobs.map(option => (
                      <MenuItem key={Math.random()} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      required
                      id="standard-required"
                      label="Location"
                      value={inputPosition}
                      placeholder="Location"
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
                                  getLongLat(suggestion);
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
                    <div />
                  </div>
                </Grid>

                {/* BUTTONS */}

                <Grid
                  container
                  item
                  xs={12}
                  alignItems="center"
                  justify="center"
                  direction="row"
                  spacing={2}
                >
                  <Grid
                    container
                    item
                    xs={8}
                    alignContent="center"
                    justify="space-evenly"
                  >
                    <Grid item xs={10} md={4} lg={4}>
                      <Button
                        style={{ width: "100% !important" }}
                        onClick={() => {
                          submitToApi(AccessToken);
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Save For Later
                      </Button>
                    </Grid>
                    <Grid item xs={10} md={4} lg={4}>
                      <Button
                        style={{ width: "100% !important" }}
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={() => {
                          activePreview();
                        }}
                      >
                        Preview
                      </Button>
                    </Grid>
                  </Grid>
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

const jobs = [
  { key: 0, label: "Accounting" },
  { key: 1, label: "Administration & Office Support" },
  { key: 2, label: "Agriculture, Horticulture, Animal & Fishing" },
  { key: 3, label: "Banking, Superannuation & Finance" },
  { key: 4, label: "Construction" },
  { key: 5, label: "Customer Service & Call Centre" },
  { key: 6, label: "Design & Architecture" },
  { key: 7, label: "Editorial, Media & Creative Arts" },
  { key: 8, label: "Education, Training & Childcare" },
  { key: 9, label: "Engineering" },
  { key: 10, label: "Executive Management & Consulting" },
  { key: 11, label: "Government, Emergency Services & Defence" },
  { key: 12, label: "Healthcare & Medical" },
  { key: 13, label: "Hospitality, Tourism & Food Services" },
  { key: 14, label: "Human Resources (HR) & Recruitment" },
  { key: 15, label: "Information Technology (IT)" },
  { key: 16, label: "Insurance" },
  { key: 17, label: "Legal" },
  { key: 18, label: "Manufacturing, Production & Operations" },
  { key: 19, label: "Marketing & Advertising" },
  { key: 20, label: "Mining & Energy" },
  { key: 21, label: "Property & Real Estate" },
  { key: 22, label: "Retail" },
  { key: 23, label: "Sales" },
  { key: 24, label: "Science, Technology & Environment" },
  { key: 25, label: "Social Work & Community Services" },
  { key: 26, label: "Trades & Services" },
  { key: 27, label: "Transport & Logistics" },
  { key: 28, label: "Work From Home & Self Employed" },
];

const seniorityOption = [
  { label: "Senior" },
  { label: "Mid-Level" },
  { label: "Junior" },
];

const type = [
  { label: "Full-Time" },
  { label: "Part-Time" },
  { label: "Casual" },
];
