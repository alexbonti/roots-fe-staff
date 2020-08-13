import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid, useMediaQuery } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import API from "../../helpers/api";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { LoginContext } from "contexts";
import { UserSearchBox } from "components";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "0 !important",
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
  let isItDesktop = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const [isSearchBoxOpen, setSearchBoxOpen] = useState(false);

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


  if (isItDesktop)
    return (
      <div className={classes.root} style={{ padding: 0 }}>
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
                <Grid item container xs={8} spacing={3}>
                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/home"
                      >
                        {" "}
                        {process.env.REACT_APP_NAME}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      <a
                        style={{ textDecoration: "none", color: "white" }}
                        target="null"
                        href={`${process.env.REACT_APP_OTHER_BASE_URL}/about`}
                      >
                        {" "}
                      About us
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      <a
                        target="null"
                        style={{ textDecoration: "none", color: "white" }}
                        href={`${process.env.REACT_APP_OTHER_BASE_URL}/help`}
                      >
                        {" "}
                      Help
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs={4} alignItems="center" justify="flex-end">
                  {loginStatus && <Grid item xs={8}>
                    <UserSearchBox />
                  </Grid>}
                  <Grid item xs={1}>
                    {loginStatus ? (
                      <IconButton color="inherit" onClick={() => logout()}>
                        <ExitToApp />
                      </IconButton>
                    ) :
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
                    }
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  else
    return (
      <div className={classes.root} style={{ padding: 0 }}>
        <AppBar position="static" style={{ backgroundColor: "#2B2B28" }}>
          <Toolbar disableGutters={false}>
            <Grid
              container
              lg={8}
              item
              justify="space-between"
              alignItems="center"
            >
              {isSearchBoxOpen ? <>
                <Grid item xs={11}>
                  <UserSearchBox />
                </Grid>
                <Grid item xs={1}>
                  <IconButton color="inherit" onClick={() => setSearchBoxOpen(false)}>
                    <i className="material-icons">close</i>
                  </IconButton>
                </Grid>
              </> : <> <Grid item xs={3}>
                <Typography variant="h6" className={classes.title}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/home"
                  >
                    {" "}
                    {process.env.REACT_APP_NAME}
                  </Link>
                </Typography>
              </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" className={classes.title}>
                      <a
                        style={{ textDecoration: "none", color: "white", fontSize: 14 }}
                        target="null"
                        href={`${process.env.REACT_APP_OTHER_BASE_URL}/about`}
                      >
                        {" "}
                      About us</a>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" className={classes.title}>
                      <a
                        target="null"
                        style={{ textDecoration: "none", color: "white", fontSize: 16 }}
                        href={`${process.env.REACT_APP_OTHER_BASE_URL}/help`}
                      >
                        {" "}
                      Help </a>
                    </Typography>
                  </Grid>
                  <> {loginStatus && <Grid item xs={1}>
                    <IconButton color="inherit" onClick={() => setSearchBoxOpen(true)}>
                      <i className="material-icons">search</i>
                    </IconButton>
                  </Grid>}</>
                  <Grid item xs={1}>
                    {loginStatus &&
                      <IconButton color="inherit" onClick={() => logout()}>
                        <ExitToApp />
                      </IconButton>
                    }
                  </Grid></>
              }
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
};
