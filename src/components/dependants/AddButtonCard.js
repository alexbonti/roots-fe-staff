import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HomeContext } from "contexts";

import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Icon,
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  cell: {
    borderRadius: "10px",
    border: "1px dashed black",
    maxWidth: "240px",
    minHeight: "300px",
  },
  gridMain: {
    minHeight: "230px",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    borderRadius: "0px !important",
    border: "1px solid #087b94",
    width: "100%",
  },
  containerAddButton: {
    border: "1px solid grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    height: "2vh",
    borderRadius: "3px",
  },
}));

export default function AddButtonCard(props) {
  const classes = useStyles();
  const { setAddOpportunity, setIsEditOpportunity } = useContext(HomeContext);

  const openEdit = () => {
    setIsEditOpportunity(false);
    setAddOpportunity(true);
  };

  return (
    <Grid container alignItems="center" justify="flex-end">
      <Grid
        item
        container
      >
        <Button
          onClick={() => {
            openEdit();
          }}
          fullWidth
          variant="outlined"
          color="primary"
          size="small"
        >
          Create a new Opportunity +
        </Button>
      </Grid>

    </Grid>
    
  );
}
