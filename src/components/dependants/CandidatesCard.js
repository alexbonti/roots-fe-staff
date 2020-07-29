import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HomeContext } from "../../contexts/dependants/HomeContext";
import {
  Button,
  Typography,
  Badge,
  Grid,
  Icon,
} from "@material-ui/core/";
import { TextHelper } from "helpers/index";
import moment from "moment-timezone";


const useStyles = makeStyles(() => ({
  card: {
    borderRadius: "2px",
    border: "1px solid #b1afafbf",
    borderTop: "none",
    backgroundColor: "snow",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "-1px 0px 6px #6a6a6a",
      backgroundColor: "#c3e5cc6e",
    },
    transition: "all .3s ease",
  },

  cardDefault: {
    borderRadius: "2px",
    border: "1px solid #b1afafbf",
    borderTop: "none",
    backgroundColor: "#f2f2f2",
    boxShadow: "none"
  }

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
    seniority,
  } = props.data;

  const { setIsSingle } = useContext(HomeContext);


  const requestApplicantsInfo = () => {
    console.log(_id);
    setIsSingle({ view: true, id: _id });
  };

  const statusButton = numberOfApplications < 1 ? true : false;

  const styleCardDefault = !statusButton ? classes.card : classes.cardDefault;


  return (
    <Grid container justify="center" className={styleCardDefault}
      onClick={!statusButton ? () => requestApplicantsInfo(_id) : () => { console.log("no candidates"); }}
    >
      <Grid item xs={12} style={{
        backgroundColor: "#087B94",
        height: ".5vh",
        borderRadius: "2px 2px 0px 0px",
      }} ></Grid>
      <Grid item xs={11}>
        <Typography variant="caption">{TextHelper.titleCase(company)}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography style={{ fontWeight: 500 }}>{TextHelper.titleCase(positionTitle)}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="caption">{TextHelper.titleCase(employmentType)}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="caption">{TextHelper.titleCase(seniority)}</Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="caption">
          Published on: {TextHelper.formatToD_MMMM_YYYY(publishDate)} <br />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <hr style={{ borderColor: "#c9c7c761" }} />
      </Grid>
      <Grid
        item
        container
        xs={11}
        alignItems="flex-start"
        justify="space-between"
      >
        <Grid item xs={8} sm={8} lg={8} md={8}>
          <Button
            disabled={statusButton}
            size="small"
            color="primary"
            onClick={() => requestApplicantsInfo(_id)}
          >
            View Candidates
          </Button>
        </Grid>
        <Grid item xs={3} >
          <Button disabled={true}>
            <Icon>how_to_reg</Icon>
          </Button>
          <Badge badgeContent={numberOfApplications} color="primary" />
        </Grid>
      </Grid>
    </Grid>
  );
  // return <div>{list}</div>;
}
