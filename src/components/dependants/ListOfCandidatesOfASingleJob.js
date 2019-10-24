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
import { StarRate, StarBorder } from "@material-ui/icons/";
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
  const classes = useStyles();
  const { applicantsInfo, setApplicantsInfo, setIsSingle } = useContext(
    HomeContext
  );
  const { setIsSingleCandidate } = useContext(CandidateContext);
  const {accessToken} = useContext(LoginContext)

  const dataArray = applicantsInfo.opportunityData;

  useEffect(() => {
    const data = {
      opportunityId: props.data,
    };
    const triggerAPI = async () => {
      const dataApplicants = await API.getApplicantsData(data, accessToken);
      setApplicantsInfo(dataApplicants.response);
    };

    triggerAPI();
  }, [setApplicantsInfo, props.data, accessToken ]);

  if (applicantsInfo === "") return null;
  if (applicantsInfo === undefined) return null;

  const back = () => {
    setIsSingle(false);
  };

  let content = (
    <div style={{ padding: "1vh 20vh" }}>
      <Button
        className={classes.back}
        size="small"
        onClick={() => {
          back();
        }}
      >
        {"<"} Back
      </Button>

      <h1>
        {dataArray[0].jobId.positionTitle} - {dataArray[0].jobId.location}
      </h1>

      <hr />
      <Grid className={classes.root} container spacing={3}>
        {dataArray.map(element => {
          const { first_name, last_name } = element.candidateId;
          return (
            <Grid key={Math.random()} item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid className={classes.root} container spacing={2}>
                    <Grid item xs={3}>
                      <Typography
                        className={classes.title}
                        color="primary"
                        gutterBottom
                      >
                        {first_name.toUpperCase()} {last_name.toUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} />
                    <Grid item xs={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<StarBorder />}
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
        })}
      </Grid>
    </div>
  );

  return <div>{content}</div>;
}
