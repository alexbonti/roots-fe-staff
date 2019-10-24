import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Container,
  Icon,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";
import { CandidateContext } from "contexts/index";
import { StarRate, StarBorder } from "@material-ui/icons/";
import {
  ExperienceCV,
  EducationCV,
  //VolunteerCV,
  CoverLetterCV,
} from "../index";


const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 ",
  },
  containerBottom: {
    backgroundColor: "white",
    borderRadius: "0px 0px 10px 10px ",
    padding: "32px 70px 32px 32px ",
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
    heigth: "30%",
    width: "30%",
    padding: "10px",
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


  return (
    <div>
      <Button onClick={back}> {"<"} Back</Button>
      <Container className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <img
              alt="Remy Sharp"
              src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png"
              className={classes.avatar}
            />
          </Grid>
          <Grid container item xs={5} direction="column">
            <Grid container item xs={12} >
              <Grid item xs={12} className={classes.title} >
                {first_name} {last_name} <Icon>cloud_download</Icon>
              </Grid>
              <Grid item xs={12}>
                {emailId}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}  style={{textAlign: "end"}}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<StarBorder />}
                  checkedIcon={<StarRate />}
                  value="checkedH"
                  onClick={(e) => {console.log(e.target);}}
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
