import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import JobCard from "./JobCard";
import JobCardDraft from "./JobCardDraft";
import CanditatesCard from "./CandidatesCard";
import { Grid, Typography } from "@material-ui/core/";
import { HomeContext, CandidateContext } from "contexts";
import { ListOfCandidatesOfASingleJob } from "./ListOfCandidatesOfASingleJob";
import { AddButtonCard } from "../index";
import { Candidate } from "./Candidate";

const useStyles = makeStyles({
  title: {
    fontSize: 30,
    //padding: "10px 0",
    fontWeight: "bolder",
    //margin: "3rem 0",
  },
  container: {
    backgroundColor: "white",
  },
});

export function ListOpportunity(props) {
  const classes = useStyles();
  const { tabNumber, isSingle, setIsSingle } = useContext(HomeContext);
  const { isSingleCandidate } = useContext(CandidateContext);
  let list = props.data;
  let listDraft = props.data2;
  useEffect(() => {
    setIsSingle(false);
  }, [tabNumber, setIsSingle]);

  const draftTitle =
    listDraft.length === 0 || undefined ? (
      ""
    ) : (
      <Grid
        item
        xs={12}
        md={9}
        lg={9}
        container
        justify="flex-start"
        style={{ padding: "3vh 0" }}
      >
        <Grid item>
          <Typography variant="h5">Draft Opportunities</Typography>
        </Grid>
      </Grid>
    );

  const expiredTitle =
    listDraft.length === 0 || undefined ? (
      ""
    ) : (
      <Grid
        item
        xs={12}
        md={9}
        lg={9}
        container
        justify="flex-start"
        style={{ padding: "3vh 0" }}
      >
        <Grid item className={classes.title}>
          <Typography variant="h5">Expired Opportunities</Typography>
        </Grid>
      </Grid>
    );

  const allJobs =
    tabNumber === 0 ? (
      <>
        <Grid container justify="center">
          <Grid item xs={12} md={9} lg={9} container justify="flex-end">
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
              <AddButtonCard />
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <hr />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            lg={9}
            container
            justify="flex-start"
            style={{ padding: "3vh 0" }}
          >
            <Grid item className={classes.title}>
              <Typography variant="h5">Created Opportunities</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} lg={9} container justify="flex-start" spacing={1}>
            {list.map(element => {
              let thisDate = new Date(element.endDate);
              const deltaDate = thisDate.getTime() - new Date();
              if (deltaDate > 0) {
                return (
                  <Grid item key={Math.random()}  xs={12} lg={4} md={5}>
                    <JobCard  data={element} />
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>

        <Grid container justify="center">
          {draftTitle}
          <Grid item xs={12} md={9} lg={9} container justify="flex-start" spacing={1}>
            {listDraft.map(element => {
              return (
                <Grid key={Math.random()} item  xs={12} lg={4} md={5}>
                  <JobCardDraft  data={element} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid container justify="center">
          {expiredTitle}
          <Grid item xs={12} md={9} lg={9} container justify="flex-start" spacing={1}>
            {list.map(element => {
              let thisDate = new Date(element.endDate);
              const deltaDate = thisDate.getTime() - new Date();
              if (deltaDate < 0) {
                return (
                  <Grid item key={Math.random()}  xs={12} lg={4} md={5}>
                    <JobCard data={element} type={"elapsed"} />
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>
      </>
    ) : (
      <>
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            md={9}
            lg={9}
            container
            justify="flex-start"
          >
            <Grid item className={classes.title}>
              <Typography variant="h5">Open Opportunities</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <hr />
          </Grid>

          <Grid item xs={12} md={9} lg={9} container justify="flex-start" spacing={1}>
            {list.map(element => {
              let thisDate = new Date(element.endDate);
              const deltaDate = thisDate.getTime() - new Date();
              if (deltaDate > 0) {
                return (
                  <Grid item xs={12} lg={4} md={5}>
                    <CanditatesCard key={Math.random()} data={element} />
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>
      </>
    );

  const view = isSingleCandidate._ ? (
    <Candidate data={isSingleCandidate.userDetails} />
  ) : (
    <ListOfCandidatesOfASingleJob data={isSingle.id} />
  );

  const content = isSingle.view && tabNumber === 1 ? view : allJobs;
  return content;
}
