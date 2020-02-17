import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Avatar,
  Typography,
  ListItem,
} from "@material-ui/core/";
import { CandidateContext } from "contexts/index";
import {
  ExperienceCV,
  EducationCV,
  //VolunteerCV,
  CoverLetterCV,
} from "../index";
import DescriptionIcon from "@material-ui/icons/Description";

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

  const coverLetterCard =
    coverLetter !== "" && coverLetter.includes("http") !== "https:" ? (
      <CoverLetterCV data={coverLetter} />
    ) : (
      ""
    );

  // let coverLetterFileIcon =
  //   coverLetter !== "" && coverLetter.includes("http")  ? (
  //     <Grid
  //       item
  //       xs={6}
  //       container
  //       alignItems="baseline"
  //       // style={{ padding: "2vh 0" }}
  //     >
  //       <Grid item xs={11}>
  //         <a
  //           target="blank"
  //           href={resumeURL}
  //           style={{
  //             textDecoration: "none",
  //             color: "black",
  //           }}
  //         >
  //           <DescriptionIcon
  //             fontSize="large"
  //             style={{ color: "rgba(8, 123, 148, 0.45)" }}
  //           />
  //         </a>
  //       </Grid>
  //       <Grid item xs={11}>
  //         <Typography color="primary" variant="caption">
  //           Cover Letter
  //         </Typography>
  //       </Grid>
  //     </Grid>
  //   ) : (
  //     ""
  //   );

  // let resumeURLFileIcon =
  //   resumeURL !== "" ? (
  //     <Grid
  //       item
  //       xs={6}
  //       container
  //       alignItems="center"
  //       // style={{ padding: "2vh 0" }}
  //     >
  //       <Grid item xs={11}>
  //         <a
  //           target="blank"
  //           href={resumeURL}
  //           style={{
  //             textDecoration: "none",
  //             color: "black",
  //           }}
  //         >
  //           <DescriptionIcon
  //             fontSize="large"
  //             style={{ color: "rgba(8, 123, 148, 0.45)" }}
  //           />
  //         </a>
  //       </Grid>
  //       <Grid item xs={11}>
  //         <Typography color="primary" variant="caption">
  //           Resume
  //         </Typography>
  //       </Grid>
  //     </Grid>
  //   ) : (
  //     ""
  //   );
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Button onClick={back}> {"<"} Back</Button>
        </Grid>
        <Grid
          justify="center"
          container
          item
          xs={12}
          md={8}
          style={{ borderRadius: "10px", boxShadow: "1px 1px 2px #d0d0d0" }}
        >
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            className={classes.container}
            justify="space-between"
          >
            <Grid container item xs={12} alignItems="center">
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src={avatar}
                  className={classes.avatar}
                />
              </Grid>

              <Grid
                item
                container
                alignItems="baseline"
                xs={8}
                justify="space-between"
              >
                <Grid item xs={6} style={{ paddingTop: "2vh 0" }}>
                  <Typography variant="h4" style={{ color: "#545353" }}>
                    {first_name} {last_name}{" "}
                  </Typography>
                </Grid>
                {/* <Grid container item xs={4}>
                  {resumeURLFileIcon}
                  {coverLetterFileIcon}
                </Grid> */}
                <Grid item xs={11}>
                  <ListItem color="primary" style={{ padding: "0" }}>
                    <a
                      href={`mailto:${emailId}`}
                      target="_top"
                      style={{
                        textDecoration: "none",
                        color: "#087B94",
                      }}
                    >
                      {emailId}
                    </a>
                  </ListItem>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {coverLetterCard}
          </Grid>
          <Grid item xs={12}>
            <ExperienceCV data={workExperience} />
          </Grid>
          <Grid item xs={12}>
            <EducationCV data={education} />
          </Grid>
        </Grid>
      </Grid>
      {/* <VolunteerCV data={volunteer} /> */}
    </div>
  );
};
