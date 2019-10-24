import React, { useContext } from "react";
import ReactDOM from 'react-dom';
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Container,
  Icon,
  Checkbox,
  FormControlLabel,
  Avatar,
  Typography,
} from "@material-ui/core/";
import { CandidateContext } from "contexts/index";
import { StarRate, StarBorder } from "@material-ui/icons/";
import {
  ExperienceCV,
  EducationCV,
  //VolunteerCV,
  CoverLetterCV,
} from "../index";


import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);






const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 ",
  },
  transparentContainer: {
    padding: "10px 32px ",
  },
  title: {
    fontSize: 34,
  },
  subText: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  rightIcon: {
    marginLeft: "5px",
  },
  button1: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94",
  },
  button2: {
    borderRadius: "20px",
  },
  back: {
    margin: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    margin: 10,
  },
  icon: {
    alignSelf: "center",
  },
});



export const Candidate = props => {
  const classes = useStyles();
  const { setIsSingleCandidate } = useContext(CandidateContext);
  const {
    //volunteer,
    workExperience,
    education,
  } = props.data.UserExtendedProfile;
  const coverLetter = `<h2>Why Bother With a Cover Letter at All?</h2>
  <p>Before we jump in, it’s worth emphasizing <em>why</em> cover letters still exist and are worthy of your attention. I bet when you see a job listing where one’s “optional” you gleefully submit a resume and move on. But you’re truly doing yourself a disservice by not creating one (or by writing one that’s super generic or formulaic).</p>
  <p>“When you’re writing a resume you’re oftentimes confined by space, by resume speak, by keywords—you’re up against a lot of technical requirements,” says <a href="https://www.themuse.com/coaches/write-in-color">Melody Godfred</a>, a Muse career coach and founder of <a href="https://www.writeincolor.com/" rel="nofollow" target="_blank">Write in Color</a> who’s read thousands of cover letters over the course of her career, “whereas in a cover letter you have an opportunity to craft a narrative that aligns you not only with the position you’re applying to but also the company you’re applying to.”</p>
  <p><br /></p>
  <div class="quote">
  <div class="quote-text"><blockquote>
  <p>When you’re writing a resume you’re oftentimes confined by space, by resume speak, by keywords—you’re up against a lot of technical requirements, whereas in a cover letter you have an opportunity to craft a narrative that aligns you not only with the position you’re applying to but also the company you’re applying to.<br></p></p>
  </blockquote></div>
  </div>
  <p><br /></p>`;
  const { first_name, last_name, emailId } = props.data;

  const back = () => {
    setIsSingleCandidate(false);
  };

  ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
  return (
    <div>
      <Button onClick={back}> {"<"} Back</Button>
      <Container className={classes.container}>
        <Grid container direction="row" justify="space-between">
          <Grid container item xs={11} alignItems="center">
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png"
                className={classes.avatar}
              />
            </Grid>

            <Grid  item xs={4}>
              <Typography variant="h4">
                {first_name} {last_name} <Icon>cloud_download</Icon>
              </Typography>
              <Typography variant="body2">{emailId}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={1} style={{ textAlign: "end" }}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<StarBorder />}
                  checkedIcon={<StarRate />}
                  value="checkedH"
                  onClick={e => {
                    console.log(e.target);
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
      <CoverLetterCV data={coverLetter} />
      <ExperienceCV data={workExperience} />
      <EducationCV data={education} />
      {/* <VolunteerCV data={volunteer} /> */}
    </div>
  );
};
