import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Container } from "@material-ui/core/";
import { HomeContext, MyCompanyContext } from "contexts/index";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 ",
  },
  contatinerHead: {
    padding: "3vh 0",
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
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94",
  },
  button2: {
    borderRadius: "20px",
  },
  back: {
    margin: 3,
  },
});

export default function MyCompany(props) {
  const classes = useStyles();
  const {
    companyName,
    companyLogo,
    companyDescription,
    companyIndustry,
    companyLocation
  } = useContext(MyCompanyContext);

  // const {description} = useContext(TextEditorContext)

  const { setIsEditMycompany } = useContext(HomeContext);

  const openEdit = () => {
    setIsEditMycompany(true);
  };

  const companyData = props.data;

  // if (!companyData) {
  //   setIsEditMycompany(true);
  // }

  let content = companyData ? (
    <div style={{padding: "2vh 18vh"}}>
      <Container className={classes.container}>
        <Grid container className={classes.contatinerHead} direction="column">
          <Grid item xs={4}>
            <img
              alt="Remy Sharp"
              src={companyData.companyLogo}
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={4} className={classes.title}>
            {companyData.companyName}
          </Grid>
          <Grid item xs={4}>
            {/* {seniority} */}
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.transparentContainer}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.subText}>
            {companyData.location}
          </Grid>
          <Grid item xs={4} className={classes.subText}>
            {companyData.companyIndustry}
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.containerBottom}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid item xs={12} className={classes.subText}>
            {ReactHtmlParser(companyData.companyDescription)}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button
            className={classes.button1}
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => openEdit()}
          >
            Edit
            {/* <Edit className={classes.rightIcon} /> */}
          </Button>
        </Grid>
      </Container>
    </div>
  ) : (
    <div>
      <Container className={classes.container}>
        <Grid container className={classes.contatinerHead} direction="column">
          <Grid item xs={4}>
            <img
              alt="Remy Sharp"
              src={companyLogo}
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={4} className={classes.title}>
            {companyName}
          </Grid>
          <Grid item xs={4}>
            {/* {seniority} */}
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.transparentContainer}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.subText}>
            {companyLocation}
          </Grid>
          <Grid item xs={4} className={classes.subText}>
            {companyIndustry}
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.containerBottom}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid item xs={12} className={classes.subText}>
            {ReactHtmlParser(companyDescription)}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button
            className={classes.button1}
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => openEdit()}
          >
            Edit
            {/* <Edit className={classes.rightIcon} /> */}
          </Button>
        </Grid>
      </Container>
    </div>
  );
  return content;
}
