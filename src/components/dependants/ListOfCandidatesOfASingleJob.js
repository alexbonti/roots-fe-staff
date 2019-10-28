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
} from "@material-ui/core/";
import { HomeContext, CandidateContext } from "contexts";
import { StarRate, StarBorder, Star } from "@material-ui/icons/";
import { LoginContext } from "contexts/index";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
  },
  skills: {
    borderRadius: ".85rem",
    backgroundColor: "#C74197",
    color: "white",
    textAlign: "center",
    margin: "1rem",
  },
});

export function ListOfCandidatesOfASingleJob(props) {
  console.log(props.data);
  const classes = useStyles();
  const { applicantsInfo, setApplicantsInfo, setIsSingle } = useContext(
    HomeContext
  );
  const { setIsSingleCandidate, isUpdated, setIsUpdated } = useContext(
    CandidateContext
  );
  const { accessToken } = useContext(LoginContext);

  const dataArray = applicantsInfo.opportunityData;

  useEffect(() => {
    console.log("ok");
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
  console.log(shortListedData);

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
      console.log(updateShortListAPI);
    };
    triggerShortListAPI();
  };

  const shortListedRender =
    shortListedData.length > 0 ? (
      <>
        <Typography className={classes.title} color="primary" gutterBottom>
          Shortlisted Candidates
        </Typography>
        <Grid className={classes.root} container item xs={12} spacing={3}>
          {dataArray.map(element => {
            const { _id, first_name, last_name } = element.candidateId;
            let isShortListed = shortListedData.includes(_id);
            if (isShortListed) {
              return (
                <Grid
                  key={Math.random()}
                  item
                  xs={12}
                  container
                  direction="column"
                >
                  <Card className={classes.card}>
                    <CardContent>
                      <Grid
                        className={classes.root}
                        container
                        spacing={2}
                        justify="space-between"
                      >
                        <Grid item xs={6}>
                          <Typography
                            className={classes.title}
                            color="primary"
                            gutterBottom
                          >
                            {first_name.toUpperCase()} {last_name.toUpperCase()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "end" }}>
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
                      </Grid>
                      <Typography className={classes.pos} color="textSecondary">
                        {element.appliedDate.substring(0, 10)}
                      </Typography>
                      <Grid container spacing={1} justify="flex-start">
                        <Grid item className={classes.skills}>
                          HTML
                        </Grid>
                        <Grid item className={classes.skills}>
                          CSS3
                        </Grid>
                        <Grid item className={classes.skills}>
                          Javascript
                        </Grid>
                        <Grid item className={classes.skills}>
                          React
                        </Grid>
                      </Grid>
                      <Button
                        onClick={() =>
                          setIsSingleCandidate({
                            _: true,
                            userDetails: element.candidateId,
                          })
                        }
                      >
                        View
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </>
    ) : (
      <div></div>
    );

  let content = (
    <Grid
      container
      spacing={3}
      direction="column"
      style={{ padding: "1vh 20vh" }}
    >
      <Grid item>
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
      <Grid item>
        <h1>
          {dataArray[0].jobId.positionTitle} - {dataArray[0].jobId.location}
        </h1>
      </Grid>
      {shortListedRender}
      <Grid className={classes.root} container item xs={12} spacing={3}>
        {dataArray.map(element => {
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
              >
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      className={classes.root}
                      container
                      spacing={2}
                      justify="space-between"
                    >
                      <Grid item xs={6}>
                        <Typography
                          className={classes.title}
                          color="primary"
                          gutterBottom
                        >
                          {first_name.toUpperCase()} {last_name.toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: "end" }}>
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
                    </Grid>
                    <Typography className={classes.pos} color="textSecondary">
                      {element.appliedDate.substring(0, 10)}
                    </Typography>
                    <Grid container spacing={1} justify="flex-start">
                      <Grid item className={classes.skills}>
                        HTML
                      </Grid>
                      <Grid item className={classes.skills}>
                        CSS3
                      </Grid>
                      <Grid item className={classes.skills}>
                        Javascript
                      </Grid>
                      <Grid item className={classes.skills}>
                        React
                      </Grid>
                    </Grid>
                    <Button
                      onClick={() =>
                        setIsSingleCandidate({
                          _: true,
                          userDetails: element.candidateId,
                        })
                      }
                    >
                      View
                    </Button>
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
