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
import { notify } from "components";
import API from "../../../helpers/api";
import { ThemeProvider } from "@material-ui/styles";
import { Header2 } from "../../../components/dependants/Header2";
import { withRouter } from "react-router-dom";

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
const Register = props => {
  // const { setLoginStatus } = React.useContex(LoginContext);
  const classes = useStyles();
  const [pageHeading] = useState("Register");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [emailVerified, setEmailVerified] = useState("");



  // const { setOpenModal } = useContext(LoginContext);

  const registerEmployer = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      companyId: companyId.toLowerCase(),
      emailId,
      password,
    };

    const triggerAPI = async () => {
      const registerData = await API.registerEmployer(data);
      if (registerData) {
        setAccessToken(registerData.response.data.accessToken);
        setEmailVerified(registerData.response.data.employerDetails.emailVerified);
        setRedirect(true);
      }

    };
    triggerAPI();
  };

  const validationCheck = () => {
    if (
      emailId.length < 0 ||
      password.length < 0 ||
      confirmPassword.length < 0 ||
      firstName.length < 0 ||
      lastName.length < 0 ||
      companyId.lenght < 0 ||
      emailId === "" ||
      password === "" ||
      confirmPassword === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      return notify("Please fill in all the details.");
    }
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailPatternTest = emailPattern.test(emailId);
    if (!emailPatternTest) {
      notify("Email not in proper format");
    }
    if (password !== confirmPassword) {
      return notify("Passwords don't match.");
    }
    if (emailPatternTest) {
      return registerEmployer();
    }
  };

  let content = redirect ? (
    <Redirect
      to={{
        pathname: "/registerSuccess",
        state: { accessToken, emailVerified, emailId },
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
              {"Great, Let 's do this"}
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
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="email"
                onChange={e => setFirstName(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="email"
                onChange={e => setLastName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmailId(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="companyId"
                label="Company Name"
                name="Company Name"
                autoComplete="Company Name"
                onChange={e => setCompanyId(e.target.value)}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.buttons}
                onClick={validationCheck}
              >
                Register
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

export default withRouter(Register);
