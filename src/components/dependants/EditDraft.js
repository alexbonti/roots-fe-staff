import React, { useState, useContext } from "react";
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

const useStyles = makeStyles(theme => ({}));

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

export function EditDraft(props) {
  const classes = useStyles();

  const { descriptionOpportunity } = useContext(TextEditorContext);
  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");
  const [statusString, setStatusString] = useState(false);

  const {
    isPreview,
    setIsPreview,
    styleEdit,
    setStyleEdit,
    setIsUpdated,
    setIsEditOpportunity,
    setJobView,
    cardId,
  } = useContext(HomeContext);

  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions.suggestions);
  };

  const editSingleJob = () => {
    setJobView(false);
    setIsEditOpportunity(false);
  };

  const cardData = Array.isArray(props.data)
    ? props.data.filter(data => data._id === cardId)
    : "";

  const {
    description,
    employmentType,
    endDate,
    startDate,
    industryField,
    location,
    positionTitle,
    seniority,
    skills,
    locationCoordinates,
    _id
  } = cardData[0];

  console.log(locationCoordinates);

  const [editEmploymentType, setEditEmploymentType] = useState(employmentType);
  const [editPositionTitle, setPositionTitle] = useState(positionTitle);
  const [editEndDate, setEditEndDate] = useState(endDate.substring(0, 10));
  const [editIntustryField, setEditIndustryField] = useState(industryField);
  const [editLocation, setEditLocation] = useState(location);
  const [editSeniority, setEditSeniority] = useState(seniority);
  const [editSkills, setEditSkills] = useState(skills);
  const [editStartDate, setEditStartDate] = useState(
    startDate.substring(0, 10)
  );
  const [editLongitude, setEditLongitude] = useState(
    locationCoordinates.coordinates[0]
  );
  const [editLatitude, setEditLatitude] = useState(
    locationCoordinates.coordinates[1]
  );
  const [editDescription] = useState(description);

  const activePreview = () => {
    if (
      editLocation === "" ||
      editIntustryField === "" ||
      editEndDate === "" ||
      editStartDate === "" ||
      employmentType === "" ||
      seniority === "" ||
      editPositionTitle === ""
    ) {
      return notify("Please fill all the required fields");
    } else {
      setIsPreview(true);
      setStyleEdit({ display: "none" });
    }
  };

  const submitToApi = async () => {
    if (props.data) {
      const data = {
        opportunityId: cardId,
        positionTitle: editPositionTitle,
        employmentType: editEmploymentType,
        skills: editSkills,
        seniority: editSeniority,
        startDate: new Date(editStartDate).toISOString(),
        endDate: new Date(editEndDate).toISOString(),
        industryField: editIntustryField,
        description:
          descriptionOpportunity !== ""
            ? descriptionOpportunity
            : editDescription,
        location: editLocation,
        latitude: editLatitude,
        longitude: editLongitude,
      };
      const updateData = await API.updateOpportunityDraft(data);

      if (updateData) {
        setIsUpdated(true);
        notify("Job saved in Draft");
        editSingleJob();
      } else {
        notify("Please first complete your Company profile");
      }
    }
  };

  const getSkill = event => {
    event.persist();
    setEditSkills(arrayfy(event.target.value));
  };

  const setSuggestions = event => {
    event.persist();
    console.log(event.target.innerText);
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
    editDescription,
    _id,
  };
  const content =
    cardData[0] !== undefined && cardData !== null ? (
      <div>
        <div style={styleEdit}>
          <div>
            <Button
              onClick={() => {
                editSingleJob();
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
                  style={{ backgroundColor: "snow", borderRadius: "10px" }}
                >
                  <Grid item xs={11} md={7} lg={7}>
                    <TextField
                      className={classes.textField}
                      required
                      defaultValue={
                        positionTitle !== undefined ? positionTitle : "Draft"
                      }
                      id="standard-required"
                      label="Position Title"
                      placeholder="Position Title"
                      margin="normal"
                      fullWidth
                      error={statusString}
                      onChange={event => {
                        event.target.value === ""
                          ? setStatusString(true)
                          : setStatusString(false);
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
                        value={editStartDate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={event => {
                          setEditStartDate(event.target.value);
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
                        value={editEndDate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={event => {
                          setEditEndDate(event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={11} md={7} lg={7} style={{ padding: "3vh 0" }}>
                    {" "}
                    <TextEditor
                      data={"opportunity"}
                      editData={editDescription}
                    />{" "}
                  </Grid>
                  <Grid item xs={11} md={7} lg={7}>
                    <TextField
                      required
                      fullWidth
                      id="standard-required"
                      value={
                        editSkills.length > 0
                          ? editSkills.map(skill => skill)
                          : ""
                      }
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
                                    console.log(event);
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
                      <Grid item xs={12} sm={6} style={{ padding: "1vh" }}>
                        <Button
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
                      <Grid item xs={12} sm={6} style={{ padding: "1vh" }}>
                        <Button
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
        {isPreview ? <JobFullView data={dataForFullView} comesFromDraft={true}/> : ""}
      </div>
    ) : (
      ""
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
