import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core/";
import { HomeContext, TextEditorContext } from "contexts/index";
import ReactHtmlParser from "react-html-parser";
import { Send, Edit } from "@material-ui/icons/";
import { AccessToken } from "../../contexts/helpers/";
import API from "../../helpers/api";
import { notify } from "../common/Notification";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 ",
  },
  containerBottom: {
    backgroundColor: "white",
    borderRadius: "0px 0px 10px 10px ",
    padding: "32px 70px 32px 32px ",
  },
  transparentContainer: {
    padding: "10px 32px ",
  },
  title: {
    fontSize: 34,
  },
  subText: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rightIcon: {
    marginLeft: "5px",
  },
  button1: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94",
    "&:hover": {
      color: "white",
    },
  },
  button2: {
    borderRadius: "20px",
  },
  back: {
    margin: 3,
  },
});

export default function FullViewCard(props) {
  const classes = useStyles();

  const {
    setIsPreview,
    setStyleEdit,
    setAddOpportunity,
    setIsUpdated,
    setJobView,
  } = useContext(HomeContext);

  const {
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
    _id,
  } = props.data;

  console.log(editLongitude, editLatitude);

  console.log(props.data);

  const { descriptionOpportunity } = useContext(TextEditorContext);

  const closePreview = () => {
    setStyleEdit({ display: "block" });
    setIsPreview(false);
  };

  const submitToApi = async () => {
    const data = {
      positionTitle: editPositionTitle,
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
    if (props.comesFromDraft) {
      const postData = await API.draftToOpportunity({ draftId: _id });

      if (postData) {
        setIsUpdated(true);
        notify("Job Created");
        //setAddOpportunity(false);
        //setIsEditOpportunity(false);
        setJobView(false);
        closePreview();
      }
    } else {
      const postData = await API.postOpportunity(data);
      if (postData) {
        setIsUpdated(true);
        notify("Job Created");
        setAddOpportunity(false);
        //setIsEditOpportunity(false);
        setJobView(false);
        closePreview();
      }
    }
  };

  return (
    <>
      <Button
        className={classes.back}
        size="small"
        onClick={() => {
          closePreview();
        }}
      >
        {"<"} Back
      </Button>
      <Grid container justify="center">
        <Grid
          item
          container
          xs={11}
          md={6}
          lg={6}
          justify="center"
          style={{
            backgroundColor: "snow",
            borderRadius: "10px",
            padding: "1vh 0",
            boxShadow: "1px 1px 3px #d0d0d0",
          }}
        >
          <Grid item xs={11} className={classes.title}>
            {editPositionTitle}
          </Grid>
          <Grid item xs={11}>
            {editSeniority}
          </Grid>
          <Grid item xs={11}>
            {editStartDate.substring(0, 10)} - {editEndDate.substring(0, 10)}
          </Grid>

          <Grid
            container
            justify="center"
            style={{
              padding: "1vh 0",
              color: "white",
              backgroundColor: "#087b9473",
            }}
          >
            <Grid item xs={11}>
              {" "}
              {editLocation}
            </Grid>

            <Grid item xs={11}>
              {editPositionTitle} - {editIntustryField}
            </Grid>
            <Grid item xs={11}>
              {editEmploymentType}
            </Grid>
          </Grid>

          <Grid item xs={11} className={classes.subText}>
            {ReactHtmlParser(descriptionOpportunity)}
          </Grid>
          <Grid
            container
            item
            xs={11}
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={5}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button2}
                onClick={() => {
                  submitToApi(AccessToken);
                }}
              >
                Publish
                <Send className={classes.rightIcon} />
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                fullWidth
                className={classes.button1}
                variant="contained"
                color="primary"
                onClick={() => {
                  closePreview();
                }}
              >
                Edit
                <Edit className={classes.rightIcon} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
