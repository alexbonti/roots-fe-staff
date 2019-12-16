import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core/";
import { HomeContext, CandidateContext } from "contexts";
import { StarRate, StarBorder, Star } from "@material-ui/icons/";
import { LoginContext } from "contexts/index";

const useStyles = makeStyles({
  card: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "-1px -1px 5px #6a6a6a",
    },
    transition: "all .1s ease",
  },
});

export function ListOfCandidatesOfASingleJob(props) {
  const classes = useStyles();
  const { applicantsInfo, setApplicantsInfo, setIsSingle } = useContext(
    HomeContext
  );
  const { setIsSingleCandidate, isUpdated, setIsUpdated } = useContext(
    CandidateContext
  );
  const { accessToken } = useContext(LoginContext);

  const dataArray = applicantsInfo.opportunityData;

  console.log(dataArray)

  useEffect(() => {
    setIsUpdated(false);
  }, [isUpdated]);

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
      const updateShortListAPI = await API.updateShortList(data);
      setIsUpdated(true);
    };
    triggerShortListAPI();
  };

  const shortListedRender =
    shortListedData.length > 0 ? (
      <>
        <Grid container item xs={12} alignItems="center" justify="center">
          <Grid item xs={12} lg={9} md={9}>
            <Typography color="primary" variant="h5" gutterBottom>
              Shortlist
            </Typography>
          </Grid>
          {dataArray.map(element => {
            const skills = element.candidateId.UserExtendedProfile.skills;
            const { _id, first_name, last_name } = element.candidateId;
            let isShortListed = shortListedData.includes(_id);
            if (isShortListed) {
              return (
                <Grid
                  key={Math.random()}
                  item
                  xs={12}
                  lg={9}
                  md={9}
                  container
                  direction="column"
                  className={classes.card}
                  justify="center"
                  style={{margin: "1vh 0"}}
                >
                  <Card>
                    <CardContent>
                      <Grid container justify="space-between">
                        <Grid
                          item
                          xs={11}
                          onClick={() =>
                            setIsSingleCandidate({
                              _: true,
                              userDetails: element.candidateId,
                            })
                          }
                        >
                          <Typography
                            className={classes.title}
                            color="primary"
                            gutterBottom
                          >
                            {first_name.toUpperCase()} {last_name.toUpperCase()}
                          </Typography>
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            {element.appliedDate.substring(0, 10)}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "end" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onClick={() => {
                                  updateShortList(props.data, _id);
                                }}
                                icon={
                                  isShortListed ? (
                                    <Star style={{ color: "#FFD922" }} />
                                  ) : (
                                    <StarBorder />
                                  )
                                }
                                checkedIcon={<StarRate />}
                                value="checkedH"
                              />
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          xs={11}
                          container
                          spacing={1}
                          onClick={() =>
                            setIsSingleCandidate({
                              _: true,
                              userDetails: element.candidateId,
                            })
                          }
                        >
                          {skills.map(skill => {
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
                          })}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
        <Grid item xs={12} lg={9} md={9} style={{ padding: "2vh 0" }}>
          <hr style={{ border: "1px solid #d0d0d0" }} />
        </Grid>
      </>
    ) : (
      <div></div>
    );

  let content =  (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Button
          className={classes.back}
          size="small"
          onClick={() => {
            back();
          }}
        >
          {"<"} Back
        </Button>
      </Grid>
      <Grid item xs={12} lg={9} md={9}>
        <Typography
          color="textPrimary"
          variant="h5"
          style={{ padding: "2vh 0" }}
        >
          {dataArray[0].jobId.positionTitle}
        </Typography>
      </Grid>
      {shortListedRender}
      <Grid className={classes.root} container item xs={12} lg={9} md={9}>
        {dataArray.map(element => {
          const skills = element.candidateId.UserExtendedProfile.skills;
          const { _id, first_name, last_name } = element.candidateId;
          let isShortListed = shortListedData.includes(_id);
          if (!isShortListed) {
            return (
              <Grid
                key={Math.random()}
                item
                xs={12}
                container
                direction="column"
                style={{margin: "1vh 0"}}
              >
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      className={classes.root}
                      container
                      spacing={2}
                      justify="space-between"
                    >
                      <Grid
                        item
                        xs={11}
                        onClick={() =>
                          setIsSingleCandidate({
                            _: true,
                            userDetails: element.candidateId,
                          })
                        }
                      >
                        <Typography
                          className={classes.title}
                          color="primary"
                          gutterBottom
                        >
                          {first_name.toUpperCase()} {last_name.toUpperCase()}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {element.appliedDate.substring(0, 10)}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} style={{ textAlign: "end" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onClick={() => {
                                updateShortList(props.data, _id);
                              }}
                              icon={
                                isShortListed ? (
                                  <Star style={{ color: "#FFD922" }} />
                                ) : (
                                  <StarBorder />
                                )
                              }
                              checkedIcon={<StarRate />}
                              value="checkedH"
                            />
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={11}
                        container
                        spacing={1}
                        style={{ padding: "1vh 0" }}
                        onClick={() =>
                          setIsSingleCandidate({
                            _: true,
                            userDetails: element.candidateId,
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
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    </Grid>
  );

  return <div>{content}</div>;
}
