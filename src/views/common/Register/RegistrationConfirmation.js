import React, { useState, useContext } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  makeStyles,
  Button,
  Grid,
  TextField,
  createMuiTheme
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { API } from "helpers/index";
import { LoginContext } from "../../../contexts/common/LoginContext";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  registerBox: {
    width: "100%", // Fix IE 11 issue.
    height: "50vh",
    marginTop: theme.spacing(2),
    backgroundColor: "azure"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttons: {
    marginTop: theme.spacing(1),
    borderRadius: "1rem",
    backgroundColor: "#087B94",
    color: "white"
  },
  developMessage: {
    position: "absolute",
    bottom: "1vh"
  },
  blockTop: {
    color: "black",
    fontSize: "20px",
    height: "20vh",
    backgroundColor: "rgba(8, 123, 148, 0.08)",
    margin: "30px 0",
    maxWidth: "100%"
  },
  text: {
    fontFamily: "Lato, Helvetica, Arial, sans-serif",
    fontSize: "large",
    fontWeight: "600"
  },
  containerButton: {
    lineHeight: "5rem",
    textAlign: "center"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,

    tonalOffset: 0.2
  }
});

const RegistrationConfirmation = ({...props}) => {
  console.log(props)
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { setLoginStatus, setAccessToken } = useContext(LoginContext);
  const [hasGotRights] = useState(
    props.location.state &&
      props.location.state.hasOwnProperty("accessToken") &&
      !props.location.state.emailVerified
      ? true
      : false
  );

  console.log(props);

  let accessToken =
    props.location.state && props.location.state.hasOwnProperty("accessToken")
      ? props.location.state.accessToken
      : "";

  React.useEffect(() => {
    if (isVerified) {
      setLoginStatus(true);
    }
  }, [code, isVerified, setLoginStatus]);

  const sendCode = async () => {
    const verificationStatus = await API.sendOTP(
      { "OTPCode": code },
      accessToken
    );
    if (verificationStatus === 200) {
      window.localStorage.setItem("accessToken", accessToken);
      setIsVerified(true);
    }
  };

  const content = isVerified ? (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={classes.registerBox}
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={3} className={classes.text}>
          Your account has been verified{" "}
        </Grid>
        <Grid item xs={3} container spacing={2}>
          <Grid item xs={6} className={classes.containerButton}>
            <Button className={classes.buttons}>
              <Link to="/">Home</Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={classes.registerBox}
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={3} className={classes.text}>
          A verification code has been sent to {props.location.state.emailId}
        </Grid>
        <Grid item xs={3} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otpCode"
              label="Verification Code"
              name="Verification Code"
              onChange={e => setCode(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={6} className={classes.containerButton}>
            <Button
              className={classes.buttons}
              onClick={() => {
                sendCode();
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

  if (!hasGotRights) {
    return <Redirect to="/" />;
  }

  return content;
};

export default withRouter(RegistrationConfirmation);
