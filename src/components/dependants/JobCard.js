import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HomeContext } from "../../contexts/dependants/HomeContext";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({

  cell: {
    borderRadius: "10px",
    border: "1px dashed black",
    maxWidth: "240px",
    minHeight: "200px",
  },

  gridMain: {
    minHeight: "230px",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    borderRadius: "25px",
    border: "1px solid #087b94",
    color: "#087b94",
    width: "80%",
  },
  topBarCard: {
    border: "1px solid #b1afafbf",
    borderTop: "none",
    borderRadius: "2px",
    backgroundColor: "snow", 
    boxShadow: "1px 2px 1px #d0d0d082"
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

  const colorTile = props.type === "elapsed" ? "rgba(255, 119, 98, 0.9)" : "#b1afafbf";

  return (
    <Grid container justify="center" style={{border: `1px solid ${colorTile}`}} className={classes.topBarCard}>
      <Grid item xs={12} style={{backgroundColor: "#087B94", height: ".5vh", borderRadius: "2px 2px 0px 0px", }}>

      </Grid>
      <Grid item xs={11}>
        <Typography style={{fontWeight: "500"}}>{positionTitle}</Typography>
      </Grid>
      <Grid  item xs={11}>
        <Typography variant="caption">{seniority}</Typography>
      </Grid>
      <Grid  item xs={11}>
        <Typography variant="caption">
          Published on: {publishDate.substring(0, 10)} <br />
          End: {endDate.substring(0, 10)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <hr style={{borderColor: "#c9c7c761"}}/>
      </Grid>
      <Grid item container  xs={11} alignItems="center" justify="flex-end" >
        <Grid item xs={5} lg={6} md={6}>
          <Button
            fullWidth
            size="small"
            color="primary"
            onClick={() => openSingleJob()}
          >
            View Add
          </Button>

        </Grid>
      </Grid>
    </Grid>
  );
}
