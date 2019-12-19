import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Icon,
  Avatar,
  Typography,
} from "@material-ui/core/";
import { CandidateContext } from "contexts/index";
import {
  ExperienceCV,
  EducationCV,
  //VolunteerCV,
  CoverLetterCV,
} from "../index";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 ",
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
  avatar: {
    width: 120,
    height: 120,
    margin: 10,
  },
  icon: {
    alignSelf: "center",
  },
});

export const Candidate = props => {
  const classes = useStyles();
  const { setIsSingleCandidate } = useContext(CandidateContext);
  const {
    //volunteer,
    workExperience,
    education,
    avatar,
    coverLetter,
    resumeURL,
  } = props.data.UserExtendedProfile;

  const { first_name, last_name, emailId } = props.data;

  const back = () => {
    setIsSingleCandidate(false);
  };

  const cursor = resumeURL === "" || resumeURL === "string" ? "not-allowed" : "pointer";

  const coverLetterCard = coverLetter === "" ? "" : <CoverLetterCV data={coverLetter}/>
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Button onClick={back}> {"<"} Back</Button>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={8}
          lg={7}
          className={classes.container}
          justify="space-between"
        >
          <Grid container item xs={12} alignItems="center">
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                // src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png"
                src={avatar}
                className={classes.avatar}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h4">
                {first_name} {last_name}{" "}
                <a
                  target="blank"
                  href={resumeURL}
                  style={{ textDecoration: "none", color: "black", cursor: cursor }}
                >
                  <Icon fontSize="large">cloud_download</Icon>
                </a>
              </Typography>

              <Typography variant="body2">{emailId}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} lg={7}>
          {coverLetterCard}
        </Grid>
        <Grid item xs={12} md={8} lg={7}>
          <ExperienceCV data={workExperience} />
        </Grid>
        <Grid item xs={12} md={8} lg={7}>
          <EducationCV data={education} />
        </Grid>
      </Grid>

      {/* <VolunteerCV data={volunteer} /> */}
    </div>
  );
};
