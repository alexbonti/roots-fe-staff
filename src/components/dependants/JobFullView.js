import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Grid } from "@material-ui/core/";
import { HomeContext, EditOpportunityContext } from "contexts/index";
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
    fontSize: 12,
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
  },
  button2: {
    borderRadius: "20px",
  },
  back: {
    margin: 3,
  },
});

export default function FullViewCard() {
  const classes = useStyles();
  const { setIsPreview, setStyleEdit, setAddOpportunity } = useContext(
    HomeContext
  );
  const {
    position,
    seniority,
    employmentType,
    start,
    stop,
    editSkills,
    description,
    industryField,
    location,
  } = useContext(EditOpportunityContext);

  const closePreview = () => {
    setStyleEdit({ display: "block" });
    setIsPreview(false);
  };

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
      location,
    };
    setAddOpportunity(false);
    API.postOpportunity(data);
    notify("Job Saved");
    // window.location.reload();
  };

  return (
    <div>
      <Button
        className={classes.back}
        size="small"
        onClick={() => {
          closePreview();
        }}
      >
        {"<"} Back
      </Button>
      <Container className={classes.container}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.title}>
            {position}
          </Grid>
          <Grid item xs={4}>
            {seniority}
          </Grid>
          <Grid item xs={4}>
            {start.substring(0, 10)} - {stop.substring(0, 10)}
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.transparentContainer}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.subText}>
            {location}
          </Grid>
          <Grid item xs={4} className={classes.subText}>
            {position} - {industryField}
          </Grid>
          <Grid item xs={4} className={classes.subText}>
            {employmentType}
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.containerBottom}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} className={classes.subText}>
            {ReactHtmlParser(description)}
          </Grid>
          <Grid item xs={12}>
            <Button
              size="medium"
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
          <Grid item xs={12}>
            <Button
              className={classes.button1}
              size="medium"
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
      </Container>
    </div>
  );
}
