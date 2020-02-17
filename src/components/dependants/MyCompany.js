import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core/";
import { HomeContext } from "contexts/index";
import ReactHtmlParser from "react-html-parser";
import { EditMyCompany } from "./EditMyCompany";

const useStyles = makeStyles({
  contatinerHead: {
    padding: "3vh 0",
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0",
  },
  containerBottom: {
    backgroundColor: "white",
    borderRadius: "0px 0px 10px 10px ",
    padding: "32px 70px 32px 32px ",
  },
  transparentContainer: {
    padding: "10px 32px ",
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
  },
  subText: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  rightIcon: {
    marginLeft: "5px",
  },
  button1: {
    borderRadius: "25px",
    backgroundColor: "white",
    boxShadow: "none",
    border: "1px solid #087B94",
    color: "#087B94",
    transition: " all .1s ease",
    "&:hover": {
      color: "white",
      backgroundColor: "#087B94"
    },
    height: "55px"
  },
  button2: {
    borderRadius: "25px",
    height: "55px"

  },
  back: {
    margin: 3,
  },
  avatar:{
    borderRadius: "25px"
  }
});

export default function MyCompany(props) {
  const classes = useStyles();

  const { isEditMyCompany, setIsEditMycompany } = useContext(HomeContext);

  const openEdit = () => {
    setIsEditMycompany(true);
  };

  const companyData = props.data.companyDetails;

  if(companyData === null ) {return <div>Loading</div>;}
  if(companyData === undefined ) {return <div>Loading</div>;}
  let content =
    companyData !== undefined  && companyData !== null? (
      <>
        <Grid container justify="center" alignItems="center">
          <Grid
            container
            item
            xs={10}
            md={8}
            className={classes.contatinerHead}
            justify="center"
          >
            <Grid item container xs={11}>
              <Grid item xs={5}>
                <img
                  alt="Remy Sharp"
                  src={companyData.companyLogo}
                  className={classes.avatar}
                />
              </Grid>
              <Grid
                item
                container
                xs={5}
                alignItems="center"
                className={classes.title}
              >
                <Typography variant="h4">{companyData.companyName}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            justify="center"
            xs={10}
            md={8}
            style={{
              padding: "1vh 0",
              color: "white",
              backgroundColor: "#087b9473",
            }}
          >
            <Grid item xs={11}>
              {companyData.location}
            </Grid>
            <Grid item xs={11}>
              {companyData.companyIndustry}
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            alignItems="center"
            item
            xs={10}
            md={8}
            style={{
              backgroundColor: "white",
              borderRadius: "0 0 10px 10px",
              padding: "1vh 0",
            }}
          >
            <Grid item xs={11} style={{minHeight: "28vh"}}>
              {ReactHtmlParser(companyData.companyDescription)}
            </Grid>

            <Grid item xs={10} md={4} lg={3} style={{ padding: "2vh 0" }}>
              <Button
                className={classes.button1}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => openEdit()}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    ) : (
      <div>Loading</div>
    );

  return isEditMyCompany ? <EditMyCompany data={companyData} /> : content;
}
