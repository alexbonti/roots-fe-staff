import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HomeContext } from "../../contexts/dependants/HomeContext";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Badge,
  Grid,
  Icon
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  cell: {
    borderRadius: "10px",
    border: "1px dashed black"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  icon: {
    margin: theme.spacing(0)
  },
  iconHover: {
    margin: theme.spacing(0),
    "&:hover": {
      color: "red"
    }
  },
  button: {
    borderRadius: "25px",
    border: "1px solid #087b94",
    width: "100%",
    color: "#087b94"
  }
}));

export default function CandidatesCard(props) {
  const classes = useStyles();
  const {
    company,
    positionTitle,
    employmentType,
    publishDate,
    numberOfApplications,
    _id
  } = props.data;
  console.log(props.data)

  const { setIsSingle } = useContext(HomeContext);
  const requestApplicantsInfo = () => {
    setIsSingle({ view: true, id: _id });
  };

  const statusButton = numberOfApplications < 1 ? true : false;
  return (
    <div>
      <Card className={classes.cell}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {company}
          </Typography>
          <Typography variant="h5" component="h2">
            {positionTitle}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {employmentType}
          </Typography>
          <Typography variant="body2" component="p">
            {}
            <br />
            {publishDate.substring(0, 10)}
          </Typography>
        </CardContent>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <CardActions>
              <Button
                disabled={statusButton}
                size="small"
                onClick={() => requestApplicantsInfo(_id)}
                className={classes.button}
              >
                View Candidates
              </Button>
            </CardActions>
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={12}>
            <Badge badgeContent={numberOfApplications} color="primary">
              <Button disabled={statusButton}>
                <Icon className={classes.icon}>how_to_reg</Icon>
              </Button>
            </Badge>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
  // return <div>{list}</div>;
}
