import React, { Fragment, useState, useEffect } from "react";
import { TextField, makeStyles, fade } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { API } from "helpers/index";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%"
  },
  inputRoot: {
    color: "inherit",
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
  },
  inputInput: {
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
}));


export const UserSearchBox = withRouter(props => {
  const classes = useStyles();
  const label = "Search Users";
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [userToSearch, setUserToSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (userToSearch === "") return setResults([]);
    (async () => {
      const responseData = await API.searchUsersWithName(userToSearch);
      setResults(responseData);
    })();
  }, [userToSearch]);

  let searchBox = (<Autocomplete getOptionLabel={(user) => `${user.first_name} ${user.last_name}`}
    onChange={(_, selectedUser) => {
      console.log(_, selectedUser);
      if (selectedUser !== null)
        props.history.push(`/user/${selectedUser._id}`);
    }}
    className={classes.search} open={isAutoCompleteOpen} options={results} onOpen={() => {
      setResults([]);
      setIsAutoCompleteOpen(true);
    }}
    onClose={() => setIsAutoCompleteOpen(false)} noOptionsText="No Results Found"
    renderInput={(params) =>
      <TextField size="medium"
        margin="none"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }} onChange={(e) => setUserToSearch(e.target.value)}  {...params} label={label} variant="filled" InputProps={{
          ...params.InputProps,
          endAdornment: <Fragment>

          </Fragment>
        }} />
    }

  />);

  return searchBox;
});