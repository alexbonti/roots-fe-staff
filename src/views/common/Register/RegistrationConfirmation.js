import React, { useState, useContext } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  createMuiTheme,
  Typography,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { API } from "helpers/index";
import { LoginContext } from "../../../contexts/common/LoginContext";


const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,

    tonalOffset: 0.2,
  },
});

const RegistrationConfirmation = ({ ...props }) => {
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { setLoginStatus } = useContext(LoginContext);
  const [hasGotRights] = useState(
    props.location.state &&
      props.location.state.hasOwnProperty("accessToken") &&
      !props.location.state.emailVerified
      ? true
      : false
  );


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
        justify="center"
        alignItems="center"
        style={{ padding: "3vh 0" }}
      >
        <Grid
          item
          container
          xs={11}
          lg={4}
          md={4}
          justify="space-evenly"
          style={{
            padding: "5vh 0",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "-1px -1px 2px #44434385",
          }}
        >
          <Grid item xs={12} lg={11} md={11} style={{ padding: "2vh 3vw" }}>
            <Typography variant="subtitle1" style={{ textAlign: "center" }}>
              Your account has been verified
            </Typography>
          </Grid>
          <Grid item xs={11} lg={11} md={11} style={{ padding: "3vh 3vw" }}>
            <Button variant="contained" color="primary" fullWidth>
              <Link to="/" style={{textDecoration: "none", color: "white"}}>Home</Link >
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ padding: "3vh 0" }}
      >
        <Grid
          item
          container
          xs={11}
          lg={5}
          md={5}
          justify="space-evenly"
          style={{
            padding: "5vh 0",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "-1px -1px 2px #44434385",
          }}
        >
          <Grid item xs={12} lg={11} md={11} style={{ padding: "2vh 3vw" }}>
            <Typography variant="subtitle1" style={{ textAlign: "center" }}>
              A verification code has been sent to: <br />
            </Typography>
            <Typography
              style={{ textAlign: "center" }}
              variant="h6"
              color="primary"
            >
              {props.location.state.emailId}
            </Typography>
          </Grid>
          <Grid item xs={6} lg={6} md={6} style={{ padding: "2vh 3vw" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              color="primary"
              id="otpCode"
              label="Verification Code"
              name="Verification Code"
              onChange={e => setCode(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={11} lg={11} md={11} style={{ padding: "3vh 3vw" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
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
