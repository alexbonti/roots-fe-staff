import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core/";
import ReactHtmlParser from "react-html-parser";



const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 "
  },
  containerBottom: {
    backgroundColor: "white",
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

export const ExperienceCV = props => {
  const classes = useStyles();

  return props.data.length > 0 ? (
    <div>
      <Grid container className={classes.transparentContainer}>
        <Grid container direction="column" xs={12}>
          <Grid item xs={4} className={classes.title}>
            Experience
          </Grid>
        </Grid>
      </Grid>
      {props.data.map((e, i) => {
        const {
          companyName,
          description,
          positionTitle,
          startDate,
          endDate,
          referee
        } = e;
        console.log(referee)
        return (
          <Grid container  className={classes.containerBottom} key={i}>
            <Grid
              container
              alignItems="flex-start"
              justify="center"
              spacing={3}
              item
              xs={12}
            >
              <Grid item xs={12} className={classes.title2} style={{color:"#545353"}}>
                {positionTitle}
              </Grid>
              <Grid item xs={12} className={classes.subText} style={{color:"#545353"}}>
                {companyName}
              </Grid>
            {referee !== undefined ? (
              <Grid item xs={12} className={classes.subText} style={{color:"#545353"}}>
              {referee.name} {" "} {referee.phoneNumber}
            </Grid>
            ) : "" }
              <Grid item xs={12} className={classes.subText} style={{color:"#545353"}}>
                {startDate.substring(0, 10)} - {endDate.substring(0, 10)}
              </Grid>
              <Grid item xs={12} className={classes.subText} style={{color:"#545353"}}>
                {ReactHtmlParser(description)}
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
