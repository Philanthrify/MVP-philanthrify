import OwnAccordion from "@/components/OwnAccordion";
import { accordionData } from "./howItWorks";
import { Grid, Typography } from "@mui/material";
const HowItWorks = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h5">Welcome to Philanthrify!</Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: 300, color: "grey.600" }}
            >
              Below are some quick snippets about our website
            </Typography>
          </Grid>{" "}
        </Grid>{" "}
        <Grid item>
          {" "}
          <OwnAccordion data={accordionData} />
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default HowItWorks;
