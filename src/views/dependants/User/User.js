import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, CircularProgress, Grid } from "@material-ui/core";
import { ProfileComponent } from "components";

export const UserProfile = withRouter(props => {
  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(props.match.params.userId);
  }, [props.match.params]);
  if (userId === undefined) return <CircularProgress color="inherit" size={20} />
  return (<Container style={{ marginTop: "3vh" }}>
    <Grid container justify="center" alignItems="center">
      <ProfileComponent _id={userId} />
    </Grid>
  </Container>);
});