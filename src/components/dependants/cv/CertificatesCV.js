import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import moment from "moment-timezone";
import { TextHelper } from "helpers/index";


const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 "
  },
  containerBottom: {
    backgroundColor: "white",
    padding: "32px 70px 32px 32px "
  },
  transparentContainer: {
    padding: "10px 32px",
    color: "white",
    backgroundColor: "#087b9473",

  },
  title: {
    fontSize: 34
  },
  title2: {
    fontSize: 24,
    fontWeigth: "lighter"
  },
  subText: {
    fontSize: 12
  },
  rule: {
    border: "1px solid #d0d0d0",
    width: "100%"
  },
  pos: {
    marginBottom: 12
  },
  rightIcon: {
    marginLeft: "5px"
  },
  button1: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94"
  },
  button2: {
    borderRadius: "20px"
  },
  back: {
    margin: 3
  },
  avatar: {
    heigth: "30%",
    width: "30%",
    padding: "10px"
  }
});

const Certificate = props => {
  let certificate = (<div style={{ background: "white" }}>
    <Grid container justify="center" style={{ padding: "26px" }}>
      <Grid item container>
        <Grid item xs={12}>
          <Typography variant="h6">{TextHelper.titleCase(props.title)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{TextHelper.titleCase(props.organisation)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            {`Issued on ${TextHelper.formatToD_MMMM_YYYY(props.issueDate)} - 
            ${props.expiryDate === undefined || props.expiryDate === null ? "No Expiration Date" : `Expires on ${moment(props.expiryDate).format("D MMMM YYYY")}`}`}
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1">
            {props.credentialId && `Credential ID: ${props.credentialId}`}
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography style={{
            textDecoration: "none",
            color: "#087B94"
          }} variant="body1" a target="_blank" rel="noopener noreferrer" href={props.credentialUrl} component="a">
            See Credential
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </div>);
  return certificate;
};

export const CertificatesCV = props => {
  const classes = useStyles();

  return props.data.length > 0 ? (
    <div>
      <Grid container className={classes.transparentContainer}>
        <Grid container direction="column" xs={12}>
          <Grid item xs={4} className={classes.title}>
            Certificates
          </Grid>
        </Grid>
      </Grid>
      {props.data.map((item, i) => {
        if (i + 1 < props.data.length) return <div key={"certificate_" + i}>
          <Certificate  {...item} />
          <Divider />
        </div>;
        return <Certificate key={"certificate_" + i} {...item} />;
      })}
    </div>
  ) : null;
};
