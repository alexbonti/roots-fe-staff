import React, { useContext } from "react";
import ReactHtmlParser from "react-html-parser";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Container,
  Icon,
  Checkbox,
  FormControlLabel,
  Avatar,
  Typography,
} from "@material-ui/core/";
import { CandidateContext } from "contexts/index";
import { StarRate, StarBorder } from "@material-ui/icons/";
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
    coverLetter
  } = props.data.UserExtendedProfile;
 
  const { first_name, last_name, emailId } = props.data;

  const back = () => {
    setIsSingleCandidate(false);
  };

  console.log(props.data)
  return (
    <div>
      <Button onClick={back}> {"<"} Back</Button>
      <Container className={classes.container}>
        <Grid container direction="row" justify="space-between">
          <Grid container item xs={11} alignItems="center">
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                // src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png"
                src={avatar}
                className={classes.avatar}
              />
            </Grid>

            <Grid  item xs={4}>
              <Typography variant="h4">
                {first_name} {last_name} <Icon>cloud_download</Icon>
              </Typography>
              <Typography variant="body2">{emailId}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={1} style={{ textAlign: "end" }}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<StarBorder />}
                  checkedIcon={<StarRate />}
                  value="checkedH"
                  onClick={e => {
                    console.log(e.target);
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
      <CoverLetterCV data={coverLetter} />
      <ExperienceCV data={workExperience} />
      <EducationCV data={education} />
      {/* <VolunteerCV data={volunteer} /> */}
    </div>
  );
};
