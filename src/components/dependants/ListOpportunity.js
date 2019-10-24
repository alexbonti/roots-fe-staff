import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import JobCard from "./JobCard";
import JobCardDraft from "./JobCardDraft";
import CanditatesCard from "./CandidatesCard";
import { Grid } from "@material-ui/core/";
import { HomeContext, CandidateContext } from "contexts";
import { ListOfCandidatesOfASingleJob } from "./ListOfCandidatesOfASingleJob";
import { AddButtonCard } from "../index";
import { Candidate } from "./Candidate";
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: 30,
    padding: "10px 0",
    fontWeight: "bolder",
    margin: "3rem 0"
  },
  container: {
    backgroundColor: "white"
  }
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

  const allJobs =
    tabNumber === 0 ? (
      <div style={{ padding: "1vh 20vh" }}>
        <Grid container>
          <Grid item sx={12} className={classes.title}>
            Created Opportunities
          </Grid>
        </Grid>
        <Grid className={classes.root} container spacing={3}>
          {list.map(element => {
            let thisDate = new Date(element.endDate);
            const deltaDate = thisDate.getTime() - new Date();
            if (deltaDate > 0) {
              return (
                <Grid key={Math.random()} item xs={3}>
                  <JobCard data={element} />
                </Grid>
              );
            } else {
              return null;
            }
          })}
          <Grid key={Math.random()} item xs={3}>
            <AddButtonCard />
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid item sx={12} className={classes.title}>
            Draft Opportunities
          </Grid>
          <Grid className={classes.root} container spacing={3}>
            {listDraft.map(element => {
              return (
                <Grid key={Math.random()} item xs={3}>
                  <JobCardDraft data={element} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid item sx={12} className={classes.title}>
            Expired Opportunities
          </Grid>
          <Grid className={classes.root} container spacing={3}>
            {list.map(element => {
              let thisDate = new Date(element.endDate);
              const deltaDate = thisDate.getTime() - new Date();

              if (deltaDate < 0) {
                return (
                  <Grid key={Math.random()} item xs={3}>
                    <JobCard data={element} />
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>
      </div>
    ) : (
      <div style={{ padding: "1vh 20vh" }}>
        <Grid container>
          <Grid item sx={12} className={classes.title}>
            Open Opportunities
          </Grid>
        </Grid>
        <Grid className={classes.root} container spacing={3}>
          {list.map(element => {
            return (
              <Grid key={Math.random()} item xs={3}>
                <CanditatesCard data={element} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );

  const view = isSingleCandidate._ ? (
    <Candidate data={isSingleCandidate.userDetails} />
  ) : (
    <ListOfCandidatesOfASingleJob data={isSingle.id} />
  );

  const content = isSingle.view && tabNumber === 1 ? view : allJobs;
  return content;
}
