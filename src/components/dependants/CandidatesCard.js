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
  Icon,
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({

  cell: {
    borderRadius: "10px",
    border: "1px dashed black",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    margin: theme.spacing(0),
  },
  iconHover: {
    margin: theme.spacing(0),
    "&:hover": {
      color: "red",
    },
  },
  // button: {
  //   borderRadius: "25px",
  //   border: "1px solid #087b94",
  //   width: "100%",
  //   color: "#087b94",
  // },
}));

export default function CandidatesCard(props) {
  const classes = useStyles();
  const {
    company,
    positionTitle,
    employmentType,
    publishDate,
    numberOfApplications,
    _id,
    seniority
  } = props.data;
  console.log(props.data);

  const { setIsSingle } = useContext(HomeContext);
  const requestApplicantsInfo = () => {
    setIsSingle({ view: true, id: _id });
  };

  const statusButton = numberOfApplications < 1 ? true : false;
  return (
    <Grid
      container
      justify="center"
      style={{
        border: "1px solid #b1afafbf",
        borderTop: "none",
        borderRadius: "2px",
        backgroundColor: "snow",
        boxShadow: "1px 2px 1px #d0d0d082",
      }}
    >
      <Grid
        item
        xs={12}
        style={{
          backgroundColor: "#087B94",
          height: ".5vh",
          borderRadius: "2px 2px 0px 0px",
        }}
      ></Grid>
      <Grid item xs={11}>
        <Typography variant="caption">{company}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography style={{fontWeight: "500"}}>{positionTitle}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="caption">{employmentType}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="caption" >{seniority}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="caption">
          Published on: {publishDate.substring(0, 10)} <br />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <hr style={{ borderColor: "#c9c7c761" }} />
      </Grid>
      <Grid item container xs={11} alignItems="flex-start" justify="space-between">
        <Grid item xs={5} lg={8} md={8}>
          <Button
            disabled={statusButton}
            size="small"
            color="primary"
            onClick={() => requestApplicantsInfo(_id)}
          >
            View Candidates
          </Button>
        </Grid>
        <Grid item xs={5} lg={4} md={4}>
            <Button disabled={true}>
              <Icon >how_to_reg</Icon>
            </Button>
          <Badge badgeContent={numberOfApplications} color="primary"/>
        </Grid>
      </Grid>
    </Grid>
  );
  // return <div>{list}</div>;
}
