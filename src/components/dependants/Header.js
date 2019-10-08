import React, { useState, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Grid
} from "@material-ui/core";
import { LoginContext } from "contexts";

import ExitToApp from "@material-ui/icons/ExitToApp";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: "#2B2B28"
  },
  avatar: {
    margin: 10
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(6)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  button: {
    margin: theme.spacing(1)
  },
  buttonTop: {
    margin: theme.spacing(1),
    borderRadius: "1.8rem",
    border: "2px solid #FFD922 ",
    color: "#FFD922",
    fontSize: ".73rem"
  },
  login: {
    textDecoration: "none",
    color: "white",
    marginLeft: ".5rem"
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

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setAccessToken, setLoginStatus, loginStatus } = useContext(
    LoginContext
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const logout = () => {
    window.localStorage.clear();
    setLoginStatus(false);
    setAccessToken("");
  };
  let content = (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <AppBar
          position="absolute"
          color="primary"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Grid
              container
              spacing={5}
              alignItems="center"
              justify="flex-start"
              style={{ width: "80%" }}
            >
              <Grid item container xs={3}>
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0004/3497/brand.gif?itok=eQnX_TD5"
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    DEAKIN <br /> CREATE
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Your Create
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  About Us
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                >
                  Help
                </Typography>
              </Grid>
            </Grid>
            <Button className={classes.buttonTop}>Create Opportunities</Button>
            {loginStatus ? (
              <IconButton color="inherit" onClick={() => logout()}>
                <ExitToApp />
              </IconButton>
            ) : (
              <Link to="/login" className={classes.login}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Login >
                </Typography>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
  return content;
};
