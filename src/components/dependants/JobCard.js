import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HomeContext } from "../../contexts/dependants/HomeContext";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  cell: {
    borderRadius: "10px",
    border: "1px dashed black",
    maxWidth: "240px",
    minHeight: "300px"
  },
  gridMain: {
    minHeight: "230px"
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    borderRadius: "25px",
    border: "1px solid #087b94",
    color: "#087b94",
    width: "80%"
  }
}));

export default function JobCard(props) {
  const classes = useStyles();
  const { positionTitle, seniority, publishDate, endDate } = props.data;
  const { setSingleJobData, setJobView } = useContext(HomeContext);

  const openSingleJob = () => {
    setSingleJobData(props.data);
    setJobView(true);
  };

  return (
    <div>
      <Card className={classes.cell}>
        <Grid
          className={classes.gridMain}
          container
          direction="row"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            <CardContent>
              <Typography variant="h5" component="h2" align="center">
                {positionTitle}
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                align="center"
              >
                {seniority}
              </Typography>
              <Typography variant="body2" component="p" align="center">
                {}
                Open on: {publishDate.substring(0, 10)}
                <br />
                {} <br />
                Ends on: {endDate.substring(0, 10)}
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
            <Button
              className={classes.button}
              size="small"
              onClick={() => openSingleJob()}
            >
              View Add
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
