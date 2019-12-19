import React, { useState, useContext, useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField, Grid, Button, MenuItem } from "@material-ui/core/";
import API from "../../helpers/api";
import { arrayfy } from "../../helpers/arrayfy";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import {
  HomeContext,
  TextEditorContext,
} from "../../contexts";
import JobFullView from "./JobFullView";
import { notify } from "../common/Notification";
import { AccessToken } from "../../contexts/helpers/";
import { TextEditor } from "./QuillEditor";

const useStyles = makeStyles(theme => ({
  button1: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94",
    transition: " all .1s ease", 
    "&:hover": {
      color: "white",
      backgroundColor: "#087B94"
    },
  },
  button2: {
    borderRadius: "20px",
    backgroundColor: "#087B94",
    border: "1px solid #087B94",
    color: "white",
    transition: " all .1s ease", 
    
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
  console.log(props);
  const classes = useStyles();

  const { descriptionOpportunity } = useContext(TextEditorContext);
  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");
  const [editEmploymentType, setEditEmploymentType] = useState("");
  const [editPositionTitle, setPositionTitle] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editIntustryField, setEditIndustryField] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editSeniority, setEditSeniority] = useState("");
  const [editSkills, setEditSkills] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editLongitude, setEditLongitude] = useState("");
  const [editLatitude, setEditLatitude] = useState("");
  const [errorStartDate, setErrorStartDate] = useState(false);
  const [errorEndDate, setErrorEndDate] = useState(false);

  const {
    isPreview,
    setIsPreview,
    styleEdit,
    setStyleEdit,
    setAddOpportunity,
    tabNumber,
    setIsUpdated,
    singleJobData,
  } = useContext(HomeContext);

  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions.suggestions);
  };

  const activePreview = () => {
    if (
      editLocation === "" ||
      editIntustryField === "" ||
      editEndDate === "" ||
      editStartDate === "" ||
      editEmploymentType === "" ||
      editSeniority === "" ||
      editPositionTitle === ""
    ) {
      return notify("Please fill all the required fields");
    } else {
      setIsPreview(true);
      setStyleEdit({ display: "none" });
    }
  };

  useEffect(() => {
    tabNumber !== 0 ? setAddOpportunity(false) : setAddOpportunity(true);
  }, [tabNumber, setAddOpportunity]);

  const submitToApi = async () => {
    const data = {
      positionTitle: editPositionTitle === "" ? "Draft" : editPositionTitle,
      employmentType: editEmploymentType,
      skills: editSkills,
      seniority: editSeniority,
      startDate: new Date(editStartDate).toISOString(),
      endDate: new Date(editEndDate).toISOString(),
      industryField: editIntustryField,
      description: descriptionOpportunity,
      location: editLocation,
      latitude: editLatitude,
      longitude: editLongitude,
    };

    const oppDataCall = await API.postOpportunityDraft(data);
    if (oppDataCall) {
      setIsUpdated(true);
      notify("Job Saved");
      setAddOpportunity(false);
    } else {
      notify("Something went wrong");
    }
  };

  const getSkill = event => {
    event.persist();
    setEditSkills(arrayfy(event.target.value));
  };

  const setSuggestions = event => {
    event.persist();
    setInputPosition(event.target.innerText);
    setEditLocation(event.target.innerText);
    setPositionSuggestions("");
  };

  const getLongLat = async input => {
    const data = await API.getLatLong(input.locationId);
    setEditLatitude(data.response.latitude);
    setEditLongitude(data.response.longitude);
  };

  let dataForFullView = {
    editEmploymentType,
    editPositionTitle,
    editEndDate,
    editIntustryField,
    editLocation,
    editSeniority,
    editSkills,
    editStartDate,
    editLongitude,
    editLatitude,
  };

  function prepareDate(d) {
    let date = d.split("-"); //Split the string
    return [date[0], date[1] - 1, date[2]]; //Return as an array with y,m,d sequence
  }

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
            <Grid container justify="center" alignItems="center">
              <Grid
                container
                item
                xs={12}
                md={6}
                lg={6}
                alignItems="center"
                justify="center"
                style={{ backgroundColor: "snow", borderRadius: "10px", boxShadow: "1px 1px 3px #d0d0d0" }}
              >
                <Grid item xs={11} md={7} lg={7}>
                  <TextField
                    className={classes.textField}
                    required
                    id="standard-required"
                    label="Position Title"
                    placeholder="Position Title"
                    margin="normal"
                    fullWidth
                    onChange={event => {
                      setPositionTitle(event.target.value);
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={11} md={7} lg={7}>
                  <TextField
                    id="free-solo-demo2"
                    select
                    label="Seniority"
                    value={editSeniority}
                    margin="normal"
                    fullWidth
                    required
                    className={classes.textField}
                    placeholder="Seniority"
                    onChange={e => setEditSeniority(e.target.value)}
                  >
                    {seniorityOption.map(option => (
                      <MenuItem key={Math.random()} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={11} md={7} lg={7}>
                  <TextField
                    id="free-solo-demo2"
                    select
                    label="Employment type"
                    value={editEmploymentType}
                    margin="normal"
                    required
                    className={classes.textField}
                    placeholder="Seniority"
                    fullWidth
                    onChange={e => setEditEmploymentType(e.target.value)}
                  >
                    {type.map(option => (
                      <MenuItem key={Math.random()} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  container
                  item
                  justify="space-between"
                  xs={11}
                  md={7}
                  lg={7}
                >
                  <Grid item xs={11} md={11} lg={11}>
                    <TextField
                      id="date"
                      label="Start "
                      type="date"
                      required
                      fullWidth
                      error={errorStartDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={event => {
                        let pickedDay = new Date(
                          ...prepareDate(event.target.value)
                        );
                        let today = new Date();
                        if (
                          pickedDay.getTime() - Date.now() < 0 &&
                          pickedDay.getDate() !== today.getDate()
                        ) {
                          setErrorStartDate(true);
                          notify("Wrong day");
                        } else if (
                          editEndDate !== "" &&
                          new Date(...prepareDate(editEndDate)) <
                            pickedDay.getTime()
                        ) {
                          setErrorStartDate(true);
                          notify("Start date can't be after End date");
                        } else {
                          setErrorStartDate(false);
                          setEditStartDate(event.target.value);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={11} md={11} lg={11}>
                    <TextField
                      id="date"
                      fullWidth
                      label="End"
                      required
                      type="date"
                      error={errorEndDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={event => {
                        let pickedDay = new Date(
                          ...prepareDate(event.target.value)
                        );
                        let today = new Date();

                        if (
                          pickedDay.getTime() - Date.now() < 0 &&
                          pickedDay.getDate() !== today.getDate()
                        ) {
                          setErrorEndDate(true);
                          notify("Wrong day");
                        } else if (
                          editStartDate !== "" &&
                          new Date(...prepareDate(editStartDate)) >
                            pickedDay.getTime()
                        ) {
                          setErrorEndDate(true);
                          notify("End date can't be before Start date");
                        } else {
                          setErrorEndDate(false);
                          setEditEndDate(event.target.value);
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={11} md={7} lg={7} style={{ padding: "3vh 0" }}>
                  {" "}
                  <TextEditor
                    data={"opportunity"}
                    editData={singleJobData.description}
                  />{" "}
                </Grid>
                <Grid item xs={11} md={7} lg={7}>
                  <TextField
                    required
                    fullWidth
                    id="standard-required"
                    label="Required Skills"
                    placeholder="Write your skills separated by a coma"
                    className={classes.textField}
                    onChange={event => {
                      event.preventDefault();
                      getSkill(event);
                    }}
                  />
                </Grid>
                <Grid item xs={11} md={7} lg={7}>
                  <TextField
                    id="free-solo-demo2"
                    select
                    fullWidth
                    label="Industry Field"
                    required
                    value={editIntustryField}
                    margin="normal"
                    className={classes.textField}
                    onChange={e => setEditIndustryField(e.target.value)}
                  >
                    {jobs.map(option => (
                      <MenuItem key={Math.random()} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={11} md={7} lg={7}>
                  <div>
                    <TextField
                      required
                      fullWidth
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
                  xs={11}
                  md={8}
                  lg={8}
                  alignItems="center"
                  justify="center"
                >
                  <Grid
                    container
                    item
                    xs={12}
                    alignContent="center"
                    justify="center"
                    style={{ padding: "3vh 0" }}
                  >
                    <Grid item xs={12} sm={6} style={{padding: "1vh"}}>
                      <Button
                        onClick={() => {
                          submitToApi(AccessToken);
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button1}
                      >
                        Save For Later
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{padding: "1vh"}}>
                      <Button
                        className={classes.button2}
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
            </Grid>
          </ThemeProvider>
        </div>
      </div>
      {isPreview ? <JobFullView data={dataForFullView} /> : ""}
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
