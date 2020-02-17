import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import API from "../../helpers/api";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { LoginContext } from "contexts";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "0 !important"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  login: {
    textDecoration: "none",
  },
}));

export const Header2 = () => {
  const classes = useStyles();
  const {
    setAccessToken,
    setLoginStatus,
    loginStatus,
    accessToken,
  } = useContext(LoginContext);

  const logout = () => {
    const logOut = async auth => {
      await API.logout(auth);
      window.localStorage.clear();
      setLoginStatus(false);
      setAccessToken("");
    };

    logOut(accessToken);
  };

  return (
    <div className={classes.root} style={{padding: 0 }}>
      <AppBar position="static" style={{ backgroundColor: "#2B2B28" }}>
        <Toolbar disableGutters={false}>
          <Grid container justify="center">
            <Grid
              container
              xs={12}
              lg={8}
              item
              justify="space-between"
              alignItems="center"
            >
              <Grid item container xs={6} spacing={3}>
                <Grid item>
                  <Typography variant="h6" className={classes.title}>
                    MECHID
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.title}>
                    About us
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.title}>
                    Help
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
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
                      Login {" > "}
                    </Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
