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

  },
  containerAddButton: {
    border: "1px solid grey"
  }
}));

export default function AddButtonCard(props) {
  const classes = useStyles();
  const { setAddOpportunity, setIsEditOpporinity } = useContext(HomeContext);

  const openEdit = () => {
    setIsEditOpporinity(false);
    setAddOpportunity(true);
  };

  return (
    <Grid container alignItems="center" justify="center"className={classes.containerAddButton}>
      <Grid item xs={5} lg={4} md={4}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            openEdit();
          }}
        >
          {" "}
          <Icon className={classes.icon}>add_circle_outline</Icon>
        </Button>

      </Grid>
      <Grid item container  xs={7} md={8} lg={8}>
        <Typography variant="caption">Create a new Opportunity</Typography>
      </Grid>
    </Grid>
    // <div>
    //   <Card className={classes.cell}>
    //     <Grid
    //       className={classes.gridMain}
    //       container
    //       direction="row"
    //       alignItems="flex-end"
    //     >
    //       <Grid item xs={12}>
    //         <CardContent>
    //           <Typography variant="h5" component="h2" align="center">
    //             Create a new Opportunity
    //           </Typography>
    //           <Typography
    //             className={classes.pos}
    //             color="textSecondary"
    //             align="center"
    //           ></Typography>
    //         </CardContent>
    //       </Grid>
    //       <Grid
    //         item
    //         container
    //         direction="row"
    //         justify="center"
    //         alignItems="flex-end"
    //       >
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           onClick={() => {
    //             openEdit();
    //           }}
    //         >
    //           {" "}
    //           <Icon className={classes.icon}>add_circle_outline</Icon>
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </Card>
    // </div>
  );
}
