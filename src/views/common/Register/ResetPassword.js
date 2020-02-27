import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  TextField,
  makeStyles,
  Typography,
  Button,
  Box,
  Grid,
  createMuiTheme,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { notify } from "components";
import API from "../../../helpers/api";
import { ThemeProvider } from "@material-ui/styles";
import { Header2 } from "../../../components/dependants/Header2";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  registerBox: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    marginTop: theme.spacing(1),
    borderRadius: "1rem",
    height: "55px",
  },
  // developMessage: {
  //   position: "absolute",
  //   bottom: "1vh"
  // },
  blockTop: {
    color: "black",
    fontSize: "1.5rem",
    height: "20vh",
    backgroundColor: "rgba(8, 123, 148, 0.08)",
  },
  text: {
    fontFamily: "Lato, Helvetica, Arial, sans-serif",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
const ResetPassword = props => {
  // const { setLoginStatus } = React.useContex(LoginContext);
  const classes = useStyles();
  const [pageHeading] = useState("Reset your password");
  const [emailId, setEmailId] = useState("");
  const [redirect, setRedirect] = useState(false);


  // const errors

  const [emailFieldError, setEmailFieldError] = useState(false);
  // const { setOpenModal } = useContext(LoginContext);

  const forgotPassword = () => {
    const data = {
      emailId,
    };

    const triggerAPI = async () => {
      const forgotData = await API.forgotPassword(data);
      if (forgotData) {
        setRedirect(true)
      }
    };
    triggerAPI();
  };

  const validationCheck = () => {
    if (emailId.length < 0) {
      setEmailFieldError(true);
      return notify("Email is required");
    }

    if (emailId.length < 0 || emailId === "") {
      return notify("Please fill in all the details.");
    }

    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailPatternTest = emailPattern.test(emailId);

    if (!emailPatternTest) {
      setEmailFieldError(true);
      notify("Email not in proper format");
    }
    if (emailPatternTest) {
      return forgotPassword();
    }
  };

  let content = redirect ? (
    <Redirect
      to={{
        pathname: "/reset-password-second-step",
      }}
    />
  ) : (
    <ThemeProvider theme={theme}>
      <div>
        <Header2 />
        <Grid
          className={classes.blockTop}
          container
          alignContent="center"
          justify="center"
        >
          <Grid item xs={8} lg={5} md={5}>
            <Typography className={classes.text}>
              {"Send an email to reset your password"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} justify="center">
          <Grid className={classes.registerBox} item xs={8} lg={5} md={5}>
            <Typography component="h1" variant="h5">
              {pageHeading}
            </Typography>
            <form noValidate>
              <TextField
                margin="normal"
                required
                error={emailFieldError}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmailId(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.buttons}
                onClick={validationCheck}
              >
                Send Email
              </Button>
            </form>
          </Grid>

          <Grid item xs={12} className={classes.developMessage}>
            <Box mt={5}>
              <Typography variant="body2" color="textSecondary" align="center">
                Developed by Deakin Launchpad
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
  return content;
};

export default withRouter(ResetPassword);
