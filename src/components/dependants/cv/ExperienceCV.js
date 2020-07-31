import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core/";
import ReactHtmlParser from "react-html-parser";
import { TextHelper } from "helpers/index";



const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 "
  },
  containerBottom: {
    backgroundColor: "white",
    padding: "26px"
  },
  transparentContainer: {
    padding: "10px 32px",
    color: "white",
    backgroundColor: "#087b9473",

  },
  title: {
    fontSize: 34
  },
  title2: {
    fontSize: 24,
    fontWeigth: "lighter"
  },
  subText: {
    fontSize: 12
  },
  rule: {
    border: "1px solid #d0d0d0",
    width: "100%"
  },
  pos: {
    marginBottom: 12
  },
  rightIcon: {
    marginLeft: "5px"
  },
  button1: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94"
  },
  button2: {
    borderRadius: "20px"
  },
  back: {
    margin: 3
  },
  avatar: {
    heigth: "30%",
    width: "30%",
    padding: "10px"
  }
});

export const ExperienceCV = props => {
  const classes = useStyles();
  const [isSeeMore, setIsSeeMore] = useState(true);

  return props.data.length > 0 ? (
    <div>
      <Grid container className={classes.transparentContainer}>
        <Grid container direction="column" xs={12}>
          <Grid item xs={4} className={classes.title}>
            Experience
          </Grid>
        </Grid>
      </Grid>
      {props.data.map((e, i) => {
        const {
          companyName,
          description,
          positionTitle,
          startDate,
          endDate,
          referee
        } = e;
        return (
          <>
            <Grid container className={classes.containerBottom} key={i}>
              <Grid container alignItems="flex-start" justify="center" item xs={12} >
                <Grid item xs={12} style={{ color: "#545353" }}>
                  <Typography variant="h6">
                    <span>{`${TextHelper.titleCase(positionTitle)} • `}</span>
                    <span style={{
                      fontWeight: "300",
                      fontSize: "smaller"
                    }}>{`${TextHelper.titleCase(companyName)}`}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ color: "#545353" }}>
                  <Typography variant="body1">
                    {`${TextHelper.formatToD_MMMM_YYYY(startDate)} - 
                      ${endDate === undefined || endDate === null ? "Present" : `${TextHelper.formatToD_MMMM_YYYY(endDate)}`}`
                    }
                  </Typography>
                </Grid>
                {
                  isSeeMore ?
                    <Grid item xs={12} style={{
                      textDecoration: "none",
                      color: "#087B94",
                      cursor: "pointer"
                    }} onClick={() => {
                      setIsSeeMore(false);
                    }}>
                      <Typography variant="subtitle1">
                        See More
                      </Typography>
                    </Grid> :
                    <>
                      <Grid item xs={12} style={{ color: "#545353" }}>
                        <Typography variant="body1">
                          {ReactHtmlParser(description)}
                        </Typography>
                      </Grid>
                      {referee !== undefined ? (<>
                        <Grid item xs={12}>
                          <Typography variant="body1" style={{ color: "#545353", fontWeigth: "600" }}>
                            Refrees
                          </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ color: "#545353" }}>
                          <Typography variant="body1">
                            <span style={{
                              fontWeight: "400"
                            }}>{`${TextHelper.titleCase(referee.name)} •`}</span><span style={{
                              fontWeight: "300"
                            }}> {`${referee.phoneNumber}`}</span>
                          </Typography>
                        </Grid>

                      </>
                      ) : null}
                      <Grid item xs={12} style={{
                        textDecoration: "none",
                        color: "#087B94",
                        cursor: "pointer"

                      }} onClick={() => {
                        setIsSeeMore(true);
                      }}>
                        <Typography variant="subtitle1" >
                          See less
                        </Typography>
                      </Grid>
                    </>
                }
              </Grid>
            </Grid>
            {i < props.data.length - 1 ? (
              <Divider />
            ) : null}
          </>
        );
      })}
    </div>
  ) : null;
};
