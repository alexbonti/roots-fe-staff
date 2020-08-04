import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

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
  KSC,
  Spinner,
  CertificatesCV
} from "../index";
import { API } from "helpers/index";

const useStyles = makeStyles({
  container: {
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
  const { setIsSingleCandidate } = useContext(CandidateContext);

  const back = () => {
    setIsSingleCandidate(false);
  };

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Button onClick={back}> {"<"} Back</Button>
        </Grid>
        <ProfileComponent _id={props.data._id} />
      </Grid>
    </div>
  );
};

export const ProfileComponent = props => {
  const classes = useStyles();

  const [profileLoaded, setProfileLoaded] = useState(false);
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  useEffect(() => {
    API.getCandidateInfo(props._id, (userData) => {
      if (userData.avatar !== undefined)
        setAvatar(userData.avatar);
      else
        setAvatar("");
      if (userData.education !== undefined)
        setEducation(userData.education);
      else
        setEducation([]);
      if (userData.workExperience !== undefined)
        setWorkExperience(userData.workExperience);
      else
        setWorkExperience([]);
      if (userData.certificates !== undefined)
        setCertificates(userData.certificates);
      else
        setCertificates([]);
      if (userData.first_name !== undefined)
        setFirstName(userData.first_name);
      else
        setFirstName("");
      if (userData.last_name !== undefined)
        setLastName(userData.last_name);
      else
        setLastName("");
      if (userData.emailId !== undefined)
        setEmailId(userData.emailId);
      else
        setEmailId("");
      setProfileLoaded(true);
    });
  }, [props._id]);

  const { isSingleCandidate } = useContext(CandidateContext);

  const coverLetterCard = isSingleCandidate.coverLetterCiteria && isSingleCandidate.coverLetterCiteria.cl ? <CoverLetterCV data={isSingleCandidate.coverLetterCiteria.cl} /> : "";
  const keySkillCriteria = isSingleCandidate.coverLetterCiteria && isSingleCandidate.coverLetterCiteria.ksc ? <KSC data={isSingleCandidate.coverLetterCiteria.ksc} /> : "";

  return profileLoaded ? <Grid
    justify="center"
    container
    item
    xs={12}
    md={8}
    style={{
      borderRadius: "10px",
      boxShadow: "1px 1px 2px #d0d0d0",
      paddingTop: "5px",
      paddingBottom: "5px",
      backgroundColor: "white",

    }
    }
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
        {
          avatar !== "" ? (<Grid item>
            <Avatar
              alt="Avatar"
              src={avatar}
              className={classes.avatar}
            />
          </Grid>) : ""
        }
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
      {keySkillCriteria}
    </Grid>
    <Grid item xs={12}>
      <ExperienceCV title="Experience" data={workExperience} />
    </Grid>
    <Grid item xs={12}>
      <EducationCV title="Education" data={education} />
    </Grid>
    <Grid item xs={12}>
      <CertificatesCV title="Certificates" data={certificates} />
    </Grid>
  </Grid > : <Spinner />;
};

ProfileComponent.propTypes = {
  _id: PropTypes.string.isRequired,

};