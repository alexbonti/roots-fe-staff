import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import SwipeableViews from "react-swipeable-views";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box, Grid } from "@material-ui/core/";
import { HomeContext, LoginContext, MyCompanyContext } from "contexts";
import {
  AddOpportunity,
  ListOpportunity,
  MyCompany,
  EditDraft,
} from "../../../components/index";
import API from "../../../helpers/api";
import { ThemeProvider } from "@material-ui/styles";
import SingleJob from "../../../components/dependants/SingleJob";
import { ListOfCandidatesOfASingleJob } from "components/dependants/ListOfCandidatesOfASingleJob";
import { Spinner } from "components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles({
  indicator: {
    backgroundColor: "transparent",
  },
});
export const Home2 = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [dataJobs, setDataJobs] = useState("");
  const [dataJobsDraft, setDataJobsDraft] = useState("");
  const {
    addOpportunity,
    jobView,
    setTabNumber,
    isListCanditatesOfAJob,
    isEditOpportunity,
    mainTitle,
    setMainTitle,
    isUpdated,
    setIsUpdated,
  } = useContext(HomeContext);

  const { loginStatus, accessToken } = useContext(LoginContext);
  const {
    setCompanyId,
    dataMyCompany,
    setDataMyCompany,
    isUploaded,
    setIsUploaded,
  } = useContext(MyCompanyContext);

  //-----------theme settings
  const theme = createMuiTheme({
    palette: {
      primary: { main: "#087B94", light: "#FFD922" },
      secondary: { main: "#FFD922" },
      terziary: { main: "#2B2B28" },
      accent: { main: "#FFD922" },
      error: { main: "#D0011B" },
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold: 3,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });

  //-----------table change settings--------------

  const handleChange = (event, newValue) => {
    // main title tab
    newValue === 1
      ? setMainTitle("Canditates")
      : newValue === 2
      ? setMainTitle("Company Profile")
      : setMainTitle(
          "Let's create an opportunity and start making a difference"
        );

    setTabNumber(newValue);
    setValue(newValue);
  };

  const handleChangeIndex = index => setValue(index);

  //-----if logged get company data and set them in the context

  useEffect(() => {
    if (loginStatus) {
      const triggerAPI = async () => {
        const profileData = await API.getProfileEmployer(accessToken);

        if (profileData) {
          setDataMyCompany(profileData.response[1]);
          setCompanyId(profileData.response[0].companyId);
          setIsUploaded(false);
        }
        //const companyData = await API.getCompanyDetails(accessToken);
      };
      triggerAPI(accessToken);
    }
  }, [
    accessToken,
    loginStatus,
    setCompanyId,
    isUploaded,
    setDataMyCompany,
    setIsUploaded,
  ]);

  //----------------get opportunities created
  useEffect(() => {
    const triggerAPI = async () => {
      const oppResponse = await API.getOpportunity(accessToken);
      const oppDraftResponse = await API.getOpportunityDraft(accessToken);
      if (oppResponse.status && oppDraftResponse.status) {
        setDataJobs(oppResponse.response);
        setDataJobsDraft(oppDraftResponse.response);
      }
    };
    if (loginStatus) {
      triggerAPI();
      setIsUpdated(true);
    }
    setIsUpdated(false);
  }, [loginStatus, isUpdated, accessToken, setIsUpdated]);

  // ------if there are no data opportunity will just show a loader
  const list = !addOpportunity ? (
    dataJobs && dataJobsDraft !== "" ? (
      <ListOpportunity data={dataJobs} data2={dataJobsDraft} />
    ) : (
      <Spinner /> // && <AddButtonCard />
    )
  ) : (
    <AddOpportunity />
  );

  const isEdit = isEditOpportunity ? (
    <EditDraft data={dataJobsDraft} />
  ) : (
    <SingleJob />
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ padding: "24px", backgroundColor: "white" }}
        >
          <Grid container item xs={9} md={9} lg={8} justify="center">
            <Grid item xs={12}>
              <Typography style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                {mainTitle}{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ backgroundColor: "#087B94" }}>
          <Grid
            item
            xs={12}
            style={{
              padding: "0 120.88px",
              // [theme.breakpoints.up("sm")]: {
              //   padding: "0",
              // },
            }}
          >
            <AppBar
              position="static"
              color="primary"
              style={{ boxShadow: "none" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                classes={{
                  indicator: classes.indicator,
                }}
              >
                <Tab label="Your Opportunity" {...a11yProps(0)} />
                <Tab label="Candidates" {...a11yProps(1)} />
                <Tab label="My Company" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Grid container>
              <Grid item xs={12}>
                {jobView ? isEdit : list}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {isListCanditatesOfAJob ? <ListOfCandidatesOfASingleJob /> : list}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <MyCompany data={dataMyCompany} />
          </TabPanel>
        </SwipeableViews>
      </ThemeProvider>
    </>
  );
};
