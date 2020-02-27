import React, { useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField, Grid, Button, MenuItem } from "@material-ui/core/";
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
  textField: {
    padding: "2vh 0",
  },
  button1: {
    borderRadius: "25px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94",
    transition: " all .1s ease", 
    boxShadow: "none",
    "&:hover": {
      color: "white",
      backgroundColor: "#087B94"
    },
    height: "55px"

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

export function EditMyCompany(props) {
  const classes = useStyles();
  const dataMyCompany = props.data

  

  //-------------------context
  const { companyId, tempLogo, setIsUploaded } = useContext(MyCompanyContext);

  const { description, setDescription } = useContext(TextEditorContext);

  const {setIsEditMycompany, setMainTitle } = useContext(HomeContext);
  //if(props.data !== undefined){setDescription(props.data.companyDescription)};
  //--------------------- usestates
  const [companyName, setCompanyName] = useState(props.data.companyName);
  const [companyIndustry, setCompanyIndustry] = useState(props.data.companyIndustry);
  const [companyLocation, setCompanyLocation] = useState(props.data.location);
  const [inputPosition, setInputPosition] = useState(props.data.location);
  const [positionSuggestions, setPositionSuggestions] = useState("");

  //--------------------- functions
  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions.suggestions);
  };



  if (!companyId) {
    setMainTitle("First let's create your Company profile");
  }
  const submitToApi = async () => {
    const data = {
      companyId,
      companyName,
      companyLogo: tempLogo,
      location: companyLocation,
      companyDescription: description,
      companyIndustry,
    };

    if (companyId !== null && companyId !== "") {
      const updateDataCompany = await API.updateCompanyDetails(data);
      if(updateDataCompany){
        if(updateDataCompany.response.status === 200 ){
          notify("Company Details Saved");
          setIsEditMycompany(false);
          setIsUploaded(true);
        }
      }
      
    }
  };

  const setSuggestions = event => {
    event.persist();
    setInputPosition(event.target.innerText);
    setCompanyLocation(event.target.innerText);
    setPositionSuggestions("");
  };

  

  return (
    //<Grid style={styleEdit}>
    <ThemeProvider theme={theme}>
      {/* BUTTON */}

      

      {/* //MAIN center the page */}
      <Grid container justify="center">
      <Grid container alignContent="flex-start" item xs={11} md={8}>
        <Button onClick={() =>setIsEditMycompany(false)}> {"<"} Back</Button>
      </Grid>
        <Grid
          container
          item
          xs={11}
          md={8}
          justify="center"
          style={{ padding: "3vh 0", backgroundColor: "white",borderRadius:"10px", boxShadow: "1px 1px 3px #d0d0d0" }}
        >
          <Grid item xs={11} md={11} lg={7}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              defaultValue={dataMyCompany.companyName}
              id="standard-required"
              label="Company Name"
              placeholder="Company Name"
              onChange={event => {
                setCompanyName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={11} md={11} lg={7} style={{padding: "1vh 0"}}>
            <MyDropzone />
          </Grid>
          <Grid item xs={11} md={11} lg={7}>
            <TextField
              id="free-solo-demo2"
              select
              fullWidth
              label="Industry Field"
              value={companyIndustry}
              className={classes.textField}
              onChange={e => setCompanyIndustry(e.target.value)}
            >
              {jobs.map(option => (
                <MenuItem key={Math.random()} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={11} md={11} lg={7}>
            <TextField
              required
              id="standard-required"
              label="Location"
              value={inputPosition}
              fullWidth
              placeholder="Company Location"
              className={classes.textField}
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
          <Grid
            item
            xs={11}
            md={11}
            lg={7}
            style={{ padding: "2vh 0"  }}
          >
            <TextEditor data={{mode:"edit company", data: description} }/>{" "}
          </Grid>
          <Grid
            container
            item
            xs={11}
            md={11}
            lg={7}
            justify="center"
            style={{ padding: "1vh"}}
          >
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  submitToApi(AccessToken);
                }}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button1}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
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
