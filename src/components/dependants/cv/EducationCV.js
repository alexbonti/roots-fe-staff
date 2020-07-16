import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";

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
    padding: "10px 32px",
    color: "white",
    backgroundColor: "#087b9473",
  },
  title: {
    fontSize: 34
  },
  title2: {
    fontSize: 24,
    fontWeigth: "lighter"
  },
  subText: {
    fontSize: 12
  },
  rule: {
    border: "1px solid #d0d0d0",
    width: "100%"
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
  },
  avatar: {
    heigth: "30%",
    width: "30%",
    padding: "10px"
  }
});

export const EducationCV = props => {
  const classes = useStyles();

  return props.data.length > 0 ? (
    <div>
      <Grid  container className={classes.transparentContainer}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.title}>
            Education
          </Grid>
        </Grid>
      </Grid>
      {props.data.map((e, i) => {
        const { degree, major, school, startDate, endDate } = e;
        return (
          <Grid container className={classes.containerBottom} key={i}>
            <Grid
              container
              alignItems="flex-start"
              justify="center"
              xs={12}
              spacing={3}

              item
            >
              <Grid item xs={12} className={classes.title2} style={{color:"#545353"}}>
                {school}
              </Grid>
              <Grid item xs={12} className={classes.subText} style={{color:"#545353"}}>
                {degree}, {major}
              </Grid>
              <Grid item xs={12} className={classes.subText} style={{color:"#545353"}}>
                {startDate.substring(0, 10)} - {endDate.substring(0, 10)}
              </Grid>
              <Grid item xs={12} style={{ width: "100%" }}>
                {i < props.data.length - 1 ? (
                  <hr className={classes.rule} />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </div>
  ) : null;
};
