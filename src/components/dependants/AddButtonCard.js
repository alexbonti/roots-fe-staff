import React, { useContext } from "react";
import { HomeContext } from "contexts";

import {
  Button,
  Grid,
} from "@material-ui/core/";



export default function AddButtonCard(props) {
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
