import OwnAccordion from "@/components/OwnAccordion";
import { accordionData } from "./howItWorks";
import { Grid, Typography, } from "@mui/material";

const HowItWorks = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: '128px', Width: '800px' }} // Adding margin top 
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
            <Typography variant="h5" align="center" >How Philanthrify works</Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6" align="center"
              sx={{ fontWeight: 300, color: "grey.600", marginTop: '20px', maxWidth: '800px',  }}
            >
              Philanthrify is a platform designed to aid charities in raising funds for impactful causes. Whether you're an individual, a group, or an organization, you can donate to any project and track the impact of your donations.
            </Typography>
          </Grid>{" "}
        </Grid>{" "}
        <Grid item sx={{ marginTop: '96px', marginBottom: '192px', maxWidth: '800px', }}> {/* Adding margin top */}
          <OwnAccordion data={accordionData} 
          />
          
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default HowItWorks;
