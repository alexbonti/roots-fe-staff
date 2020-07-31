import React from "react";
import { makeStyles } from "@material-ui/core";
import { Header2 } from "components";

const useStyles = makeStyles(theme => ({
  root: {
    //display: "flex",
    backgroundColor: "rgba(8, 123, 148, 0.08)"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: "93vh",
    overflow: "auto"
  },
  // container: {
  //   // paddingTop: theme.spacing(5),
  //   paddingBottom: theme.spacing(4)
  // }
}));

export const Layout = props => {
  const classes = useStyles();

  let content = (
    <div className={classes.root}>
      <Header2 />
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        <div className={classes.container}>{props.children}</div>
      </main>
    </div>
  );
  return content;
};
