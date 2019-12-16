import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActions,
  Button,
  Grid,
  Container,
  Typography
} from "@material-ui/core/";
import { HomeContext } from "contexts/index";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 "
  },
  containerBottom: {
    backgroundColor: "white",
    borderRadius: "0px 0px 10px 10px ",
    padding: "32px 70px 32px 32px "
  },
  transparentContainer: {
    padding: "10px 32px "
  },
  title: {
    fontSize: 34
  },
  subText: {
    fontSize: 12
  },
  pos: {
    marginBottom: 12
  },
  rightIcon: {
    marginLeft: "5px"
  },
  button1: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94"
  },
  button2: {
    borderRadius: "20px"
  },
  back: {
    margin: 3
  }
});

export default function FullViewCard() {
  const classes = useStyles();
  const { singleJobData, setJobView } = useContext(HomeContext);

  const closePreview = () => {
    setJobView(false);
  };
  const {
    positionTitle,
    location,
    startDate,
    endDate,
    industryField,
    employmentType,
    seniority,
    skills,
    description
  } = singleJobData;

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
        xs={10}
        md={6}
        lg={6}
        justify="center"
        style={{
          backgroundColor: "snow",
          borderRadius: "10px",
          padding: "1vh 0",
        }}
      >
        <Grid item xs={11} className={classes.title}>
          {positionTitle}
        </Grid>
        <Grid item xs={11}>
          {seniority}
        </Grid>
        <Grid item xs={11}>
          {startDate.substring(0, 10)} - {endDate.substring(0, 10)}
        </Grid>

        <Grid
          container
          justify="center"
          style={{ backgroundColor: "#e7f0f1", padding: "1vh 0" }}
        >
          <Grid item xs={11}>
            {" "}
            {location}
          </Grid>

          <Grid item xs={11}>
            {positionTitle} - {industryField}
          </Grid>
          <Grid item xs={11}>
            {employmentType}
          </Grid>
        </Grid>

        <Grid item xs={11} className={classes.subText}>
          {ReactHtmlParser(description)}
        </Grid>
        <Grid item xs={11}>
          <Typography>
            {skills.map(skill => {
              return (
                <Button
                  className={classes.button}
                  color="primary"
                  disabled
                  key={Math.random()}
                >
                  {skill}
                </Button>
              );
            })}
          </Typography>
        </Grid>
        
      </Grid>
    </Grid>
     
    </>
    
    


  );
}
