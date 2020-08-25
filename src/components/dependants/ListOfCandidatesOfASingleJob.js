import React, { useContext, useEffect, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import API from "../../helpers/api";

import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Chip,
  Avatar
} from "@material-ui/core/";
import { HomeContext, CandidateContext } from "contexts";
import { StarRate, StarBorder, Star } from "@material-ui/icons/";
import { LoginContext } from "contexts/index";
import { TextHelper } from "helpers/index";

const useStyles = makeStyles({
  card: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "-1px -1px 5px #6a6a6a",
    },
    transition: "all .1s ease",
  },
});

const JOB_STATUS = {
  APPLIED: "APPLIED",
  VIEWED: "VIEWED",
  PROCESSING: "PROCESSING",
  DENIED: "DENIED",
  ACCEPTED: "ACCEPTED",
};


const ChangeJobStatus = (props) => {
  const [status, setStatus] = useState(props.status);
  const id = Math.random().toString();
  const onChange = useCallback(async (event) => {
    const value = event.target.value;
    const response = await API.updateApplicationStatus(props.jobId, props.candidateId, value);
    if (response)
      setStatus(value);
  }, [props.candidateId, props.jobId]);

  let selector = (<FormControl >
    <InputLabel id={id + "label"}>Application Status</InputLabel>
    <Select
      labelId={id + "label"}
      id={id}
      value={status}
      onChange={onChange}
      defaultValue={status}
    >
      {Object.values(JOB_STATUS).map(value => {
        return <MenuItem key={Math.random()} value={value}>{value}</MenuItem>;
      })}
    </Select>
  </FormControl>);

  return selector;
};

export function ListOfCandidatesOfASingleJob(props) {
  const classes = useStyles();
  const { applicantsInfo, setApplicantsInfo, setIsSingle } = useContext(
    HomeContext
  );
  const { setIsSingleCandidate, isUpdated, setIsUpdated } = useContext(
    CandidateContext
  );


  const { accessToken } = useContext(LoginContext);

  const dataArray = applicantsInfo.hasOwnProperty("opportunityData") && applicantsInfo.opportunityData;


  useEffect(() => {
    setIsUpdated(false);
  }, [isUpdated, setIsUpdated]);

  useEffect(() => {
    const data = {
      opportunityId: props.data,
    };
    const triggerAPI = async () => {
      const dataApplicants = await API.getApplicantsData(data, accessToken);
      setApplicantsInfo(dataApplicants.response);
    };

    triggerAPI();
  }, [setApplicantsInfo, props.data, accessToken]);

  if (applicantsInfo === "") return null;
  if (applicantsInfo === undefined) return null;

  const back = () => {
    setIsSingle(false);
  };

  let shortListedData = applicantsInfo.opportunityData[0].jobId.shortListed;

  const updateShortList = (opportunityId, userId) => {
    let data = {
      opportunityId,
      shortListed: shortListedData,
    };

    shortListedData.includes(userId)
      ? shortListedData.pop(userId)
      : shortListedData.push(userId);

    const triggerShortListAPI = async () => {
      await API.updateShortList(data);
      setIsUpdated(true);
    };
    triggerShortListAPI();
  };

  const shortListedRender =
    shortListedData.length > 0 ? (
      <>
        <Grid container item xs={12} alignItems="center" justify="center">
          <Grid item xs={12} md={8} lg={8}>
            <Typography color="primary" variant="h5" gutterBottom>
              Shortlisted
            </Typography>
          </Grid>
          {dataArray.map(element => {
            const skills = Array.isArray(element.candidateId.skills) ? element.candidateId.skills : [];
            const { _id, first_name, last_name, avatar } = element.candidateId;
            let isShortListed = shortListedData.includes(_id);
            if (isShortListed) {
              let usersName = TextHelper.titleCase(`${first_name} ${last_name}`);
              return (
                <Grid key={Math.random()} item xs={12} md={8} lg={8} container direction="column" className={classes.card} justify="center" style={{ margin: "1vh 0" }}>
                  <Card>
                    <CardContent>
                      <Grid container justify="space-between" spacing={1}>
                        <Grid item xs={1}>
                          <Avatar style={{ height: "auto", width: "100%", maxWidth: "70px" }} alt={usersName} src={avatar} />
                        </Grid>
                        <Grid item xs={10} lg={10} onClick={() =>
                          setIsSingleCandidate({
                            _: true,
                            userDetails: element.candidateId,
                            coverLetterCiteria: {
                              cl: element.coverLetter,
                              ksc: element.criteriaSelection
                            }
                          })} >
                          <Typography className={classes.title} color="primary" gutterBottom >
                            {usersName}
                          </Typography>
                          <Typography className={classes.pos} color="textSecondary">
                            {element.appliedDate.substring(0, 10)}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "end" }}>
                          <FormControlLabel control={
                            <Checkbox
                              onClick={() => {
                                updateShortList(props.data, _id);
                              }} icon={
                                isShortListed ? (
                                  <Star style={{ color: "#FFD922" }} />
                                ) : <StarBorder />
                              } checkedIcon={<StarRate />} value="checkedH" />
                          } />
                        </Grid>
                        {skills && <Grid item xs={11} container spacing={1} onClick={() => setIsSingleCandidate({
                          _: true,
                          userDetails: element.candidateId,
                          coverLetterCiteria: {
                            cl: element.coverLetter,
                            ksc: element.criteriaSelection
                          }
                        })} >
                          {skills.map(skill => {
                            return (
                              <Grid item key={Math.random()}>
                                <Chip style={{
                                  border: "1px solid #C74298",
                                  color: "#C74298",
                                }} label={skill.toUpperCase()} variant="outlined" />
                              </Grid>
                            );
                          })}
                        </Grid>}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            } else { return ""; }
          })}
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: "2vh 0" }}>
          <hr style={{ border: "1px solid #d0d0d0" }} />
        </Grid>
      </>
    ) : null;

  let content = (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Button className={classes.back} size="small" onClick={() => {
          back();
        }}>  {"<"} Back  </Button>
        <Typography color="textPrimary" variant="h5" style={{ padding: "2vh 0", fontWeight: 500 }} >
          {TextHelper.titleCase(dataArray[0].jobId.positionTitle)}
        </Typography>
      </Grid>
      {shortListedRender}
      <Grid className={classes.root} container item xs={12} md={8} spacing={1}>
        {dataArray.map(element => {
          const skills = Array.isArray(element.candidateId.skills) ? element.candidateId.skills : [];
          const { _id, first_name, last_name, avatar } = element.candidateId;
          let isShortListed = shortListedData.includes(_id);
          if (!isShortListed) {
            let usersName = TextHelper.titleCase(`${first_name} ${last_name}`);
            return (
              <Grid key={Math.random()} item xs={12} container direction="column" spacing={1}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid className={classes.root} container spacing={2} justify="space-between" >
                      <Grid item xs={1} style={{ cursor: "pointer" }} onClick={() =>
                        setIsSingleCandidate({
                          _: true,
                          userDetails: element.candidateId,
                          coverLetterCiteria: {
                            cl: element.coverLetter,
                            ksc: element.criteriaSelection
                          }
                        })
                      }>
                        <Avatar style={{ height: "auto", width: "100%", maxWidth: "70px" }} alt={usersName} src={avatar} />
                      </Grid>
                      <Grid item xs={10} style={{ cursor: "pointer" }} onClick={() =>
                        setIsSingleCandidate({
                          _: true,
                          userDetails: element.candidateId,
                          coverLetterCiteria: {
                            cl: element.coverLetter,
                            ksc: element.criteriaSelection
                          }
                        })
                      }>
                        <Typography className={classes.title} color="primary" gutterBottom >
                          {usersName}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary" >
                          {element.appliedDate.substring(0, 10)}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} style={{ textAlign: "end" }}>
                        <FormControlLabel control={
                          <Checkbox
                            onClick={() => {
                              updateShortList(props.data, _id);
                            }} icon={
                              isShortListed ? (
                                <Star style={{ color: "#FFD922" }} />
                              ) : <StarBorder />
                            } checkedIcon={<StarRate />} value="checkedH" />
                        } />
                      </Grid>
                      <Grid item xs={12}>
                        <ChangeJobStatus
                          status={element.applicationStatus}
                          candidateId={element.candidateId._id}
                          jobId={element.jobId._id}
                        />
                      </Grid>
                      {skills.length > 0 &&
                        <Grid
                          item
                          xs={11}
                          container
                          spacing={1}
                          onClick={() =>
                            setIsSingleCandidate({
                              _: true,
                              userDetails: element.candidateId,
                              coverLetterCiteria: {
                                cl: element.coverLetter,
                                ksc: element.criteriaSelection
                              }
                            })
                          }
                        >
                          {Array.isArray(skills) ? (skills.map(skill => {
                            return (
                              <Grid item key={Math.random()}>
                                <Chip
                                  style={{
                                    border: "1px solid #C74298",
                                    color: "#C74298",
                                  }}
                                  label={skill.toUpperCase()}
                                  variant="outlined"
                                />
                              </Grid>
                            );
                          })) : ""}
                        </Grid>
                      }
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          } else { return null; }
        })}
      </Grid>
    </Grid>
  );

  return <div>{content}</div>;
}
