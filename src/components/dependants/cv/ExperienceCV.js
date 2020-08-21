import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core/";
import ReactHtmlParser from "react-html-parser";
import { TextHelper } from "helpers/index";



const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 "
  },
  containerBottom: {
    backgroundColor: "white",
    padding: "26px"
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

const ExperienceCard = (props) => {
  const classes = useStyles();
  const {
    companyName,
    description,
    positionTitle,
    startDate,
    endDate,
    referee,
    i
  } = props;

  return (<Grid container className={classes.containerBottom} key={i}>
    <Grid container alignItems="flex-start" justify="center" item xs={12} >
      <Grid item xs={12} style={{ color: "#545353" }}>
        <Typography variant="h6">
          <span>{`${TextHelper.titleCase(positionTitle)} • `}</span>
          <span style={{
            fontWeight: "300",
            fontSize: "smaller"
          }}>{`${TextHelper.titleCase(companyName)}`}</span>
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ color: "#545353" }}>
        <Typography variant="body1">
          {`${TextHelper.formatToD_MMMM_YYYY(startDate)} - 
            ${endDate === undefined || endDate === null ? "Present" : `${TextHelper.formatToD_MMMM_YYYY(endDate)}`}`
          }
        </Typography>
      </Grid>
      <>
        <Grid item xs={12} style={{ color: "#545353" }}>
          <Typography variant="body1">
            {ReactHtmlParser(description)}
          </Typography>
        </Grid>
        {referee !== undefined ? (<>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ color: "#545353", fontWeigth: "600" }}>
              Refrees
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ color: "#545353" }}>
            <Typography variant="body1">
              <span style={{
                fontWeight: "400"
              }}>{`${TextHelper.titleCase(referee.name)} •`}</span><span style={{
                fontWeight: "300"
              }}> {`${referee.phoneNumber}`}</span>
            </Typography>
          </Grid>

        </>
        ) : null}
      </>
    </Grid>
  </Grid>);
};

ExperienceCard.propTypes = {
  i: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  positionTitle: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  description: PropTypes.string,
  endDate: PropTypes.string,
  referee: PropTypes.objectOf({
    name: PropTypes.string,
    phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

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
      {props.data.map((experienceData, i) => {
        return (
          <div key={"experience_" + i}>
            <ExperienceCard {...experienceData} i={i} />
            {i < props.data.length - 1 ? (
              <Divider />
            ) : null}
          </div>
        );
      })}
    </div>
  ) : null;
};

ExperienceCV.propTypes = {
  data: PropTypes.array.isRequired
};
