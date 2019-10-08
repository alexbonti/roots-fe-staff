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
    <div>
      <CardActions>
        <Button
          className={classes.back}
          size="small"
          onClick={() => {
            closePreview();
          }}
        >
          {"<"} Back
        </Button>
      </CardActions>
      <Container className={classes.container}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.title}>
            {positionTitle}
          </Grid>
          <Grid item xs={4}>
            {seniority}
          </Grid>
          <Grid item xs={4}>
            {startDate.substring(0, 10)} - {endDate.substring(0, 10)}
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.transparentContainer}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.subText}>
            {location}
          </Grid>
          <Grid item xs={4} className={classes.subText}>
            {positionTitle} - {industryField}
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
          {/* <Grid item xs={12}>
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
          </Grid> */}
        </Grid>
        <Grid item xs={12}>
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
      </Container>
      {/* <CardActions className={classes.card}>
        <Grid container className={classes.root} space={1}>
          <CardContent>
            <Container>
              <Grid item xs={12}>
                <Typography variant="h3" component="h3">
                  {positionTitle}
                </Typography>
                <Typography color="textSecondary">{location}</Typography>
                <Typography color="textSecondary">
                  {startDate.substring(0, 10)} - {endDate.substring(0, 10)}
                </Typography>
              </Grid>
            </Container>

            <Typography className={classes.pos} color="textSecondary">
              {location} <br />
              {industryField} <br />
              {employmentType} {seniority}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={classes.description}
            >
              {description}
            </Typography>
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
          </CardContent>
        </Grid>
      </CardActions> */}
    </div>
  );
}
