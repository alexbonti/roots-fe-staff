import React, { useState, useEffect } from "react";
import { TextField, makeStyles, fade, } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { API } from "helpers/index";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  search: {
    borderRadius: "2px",
    backgroundColor: fade(theme.palette.common.white, 1),
    "& :hover": {
      backgroundColor: fade(theme.palette.common.white, 0.80),
    },
    width: "100%",
    "& .MuiAutocomplete-inputRoot[class*=\"MuiFilledInput-root\"]": {
      paddingTop: "5px !important",
      paddingRight: "8px !important",
      paddingBottom: "5px !important"
    }
  },

}));


export const UserSearchBox = withRouter(props => {
  const classes = useStyles();
  const label = "Search Users";
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [userToSearch, setUserToSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (userToSearch.length < 2) setResults([]);
    else {
      const delayDebounceFn = setTimeout(() => {
        (async () => {
          const responseData = await API.searchUsersWithName(userToSearch);
          setUserToSearch("");
          setResults(responseData);
        })();
      }, 120);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [userToSearch]);

  let searchBox = (<Autocomplete id="searchBoxOuter"

    getOptionLabel={(user) => `${user.first_name} ${user.last_name}`}
    onChange={(_, selectedUser) => {
      if (selectedUser !== null) {
        setUserToSearch("");
        props.history.push(`/user/${selectedUser._id}`);
      }
    }}
    size="small" variant="outlined" className={classes.search}
    open={isAutoCompleteOpen} options={results}
    onOpen={() => {
      setResults([]);
      setIsAutoCompleteOpen(true);
    }} onClose={() => setIsAutoCompleteOpen(false)}
    noOptionsText="No Results Found" renderInput={(params) =>
      <TextField fullWidth id="searchBox" placeholder={label}
        margin="none"
        value={userToSearch}

        onChange={(e) => {
          setUserToSearch(e.target.value);
        }} {...params} variant="filled" InputProps={{
          disableUnderline: true,
          ...params.InputProps,
          startAdornment: <i className="material-icons">search</i>,
          endAdornment: null
        }} />
    }

  />);

  return searchBox;
});