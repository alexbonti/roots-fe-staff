import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  makeStyles,
  createMuiTheme,
  Typography,
  Button,
  Box,
  Grid
} from "@material-ui/core";
import { LoginContext } from "contexts";
import { notify } from "components";
import { API } from "helpers/index";
import { Header } from "../../../components/dependants/Header";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.dark
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  loginBox: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(10)
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    width: "80%",
    margin: "1rem"
  },
  developMessage: {
    position: "absolute",
    bottom: "2vh"
  },
  inputText: {
    ".MuiInput-underline:after": {
      borderBottom: "2px solid green"
    }
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
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

export const Login = () => {
  const classes = useStyles();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { devMode, loginStatus, setAccessToken } = useContext(LoginContext);

  const performLogin = async () => {
    const data = {
      emailId,
      password
    };
    const otp = await API.loginEmployer(data, setAccessToken);
    if (!otp) {
      notify("Email or Password are wrong");
    }
  };

  const validationCheck = () => {
    if (devMode) {
      return performLogin();
    }
    if (!loginStatus) {
      const email = emailId;
      const pwd = password;
      let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailPatternTest = emailPattern.test(email);
      if (emailPatternTest && pwd) {
        performLogin();
        return true;
      } else if (emailPatternTest === undefined && pwd === undefined) {
        notify("Email or password must not be empty!");
        return false;
      } else if (!emailPatternTest) {
        notify("Email must not be empty!");
        return false;
      } else if (!emailPatternTest && email.length > 0) {
        notify("Invalid email!");
        return false;
      } else if (!pwd) {
        notify("Password must not be empty!");
        return false;
      }
    }
  };

  let content = (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Grid
          container
          spacing={0}
          justify="center"
          alignItems="center"
          style={{ height: "65vh" }}
        >
          <Grid className={classes.loginBox} item xs={10} lg={2}>
            <form noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmailId(e.target.value)}
                autoFocus
                className={classes.inputText}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                className={classes.buttons}
                onClick={validationCheck}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                className={classes.buttons}
                component={Link}
                to="/register"
              >
                Sign Up
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
