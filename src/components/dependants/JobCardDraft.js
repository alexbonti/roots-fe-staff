import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HomeContext } from "../../contexts/dependants/HomeContext";
import { Button, Typography, Grid, Modal } from "@material-ui/core/";
import { API } from "helpers";
import { notify } from "components/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: "148px",
    border: "1px solid #b1afafbf",
    borderRadius: "2px",
    backgroundColor: "snow",
    borderTop: "none",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "-1px 0px 6px #6a6a6a",
      backgroundColor: "#fff5d7",
    },
    transition: "all .3s ease",
  },
  buttonCancel: {
    color: "#f6cece",
    transition: "all .3s ease",
    "&:hover": {
      color: "#ff6a6a",
    },
  },
  paper: {
    backgroundColor: "white",
    width: "350px",
    position: "relative",
    margin: "auto",
    borderRadius: "10px",
    "&:focus": {
      outline: "none",
    },
  },
}));

// export const DeleteModal = ()=> {
//   return (
//     <div></div>
//   );
// };

export default function JobCard(props) {
  const classes = useStyles();
  const { positionTitle, seniority, _id } = props.data;
  const {
    setIsEditOpportunity,
    setIsUpdated,
    setJobView,
    setCardId
  } = useContext(HomeContext);
  const [open, setOpen] = React.useState(false);

  const editSingleJob = () => {
    setJobView(true);
    setIsEditOpportunity(true);
    setCardId(_id);
  };

  const deleteDraft = async () => {
    const data = {
      opportunityId: props.data._id,
    };

    await API.deleteOppDraft(data);
    notify("Deleted");
    setIsUpdated(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



    


  return (<>
    <Grid container justify="center" className={classes.card}>
      <Grid
        item
        xs={12}
        style={{
          backgroundColor: "rgb(244, 154, 49)",
          height: ".5vh",
          borderRadius: "2px 2px 0px 0px",
        }}
      ></Grid>
      <Grid container justify="space-between" item xs={12}>
        <Grid item xs={11} onClick={() => editSingleJob()}>
          <Typography style={{ fontWeight: "500", paddingLeft: "1vh" }}>
            {positionTitle}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <DeleteForeverIcon
            fontSize="small"
            className={classes.buttonCancel}
            onClick={handleOpen}
          />
        </Grid>
      </Grid>
      <Grid item xs={11} onClick={() => editSingleJob()}>
        <Typography variant="caption">{seniority}</Typography>
      </Grid>
      <Grid item xs={12}>
        <hr style={{ borderColor: "#c9c7c761" }} />
      </Grid>
      <Grid item container xs={11} alignItems="center" justify="flex-end">
        <Grid item xs={4} lg={4} md={4} xl={3}>
          <Button
            color="primary"
            fullWidth
            size="small"
            onClick={() => editSingleJob()}
          >
            Edit Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
      style={{ borderRadius: "10px", padding: "10vh 0" }}
    >
      <Grid container justify="center" className={classes.paper}>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#ff000099",
            height: "3vh",
            borderRadius: "10px 10px 0 0",
          }}
        />
        <Grid item xs={11} style={{ padding: "2vh 2vw" }}>
          <Typography align="center" variant="subtitle2">
            {" "}
            Do you want to cancel this draft ?
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ padding: "2vh 0" }}>
          <Button
            variant="outlined"
            fullWidth
            style={{ color: "#ff000099", borderColor: "#ff000099" }}
            onClick={() => deleteDraft()}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Modal>
  </>);
}
