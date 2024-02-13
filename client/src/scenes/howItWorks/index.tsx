import OwnAccordion from "@/components/OwnAccordion";
import { accordionData } from "./howItWorks";
import { Grid, Typography, Button } from "@mui/material";
import PhilanthrifyLogoWithPinkCircle from "@/components/Icons/Artwork/PhilanthrifyLogoWithPinkCircle";
import PageBox from "@/components/PageBox";
import TypographyTitle from "@/components/Title";
import PrimaryButton from "@/components/Button/PrimaryButton";



const HowItWorks = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: "96px" }} // Adding margin top
      >
        <Grid item>
          <PhilanthrifyLogoWithPinkCircle />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ width: "800px" }}
        >
          <Grid item>
            <Typography variant="h1" align="center">
              How Philanthrify works
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              align="center"
            >
              Philanthrify is a platform designed to aid charities in raising
              funds for impactful causes. Whether you're an individual, a group,
              or an organization, you can donate to any project and track the
              impact of your donations.
            </Typography>
          </Grid>{" "}
        </Grid>{" "}
        <Grid
          item
          sx={{ marginTop: "96px", marginBottom: "128px", maxWidth: "800px" }}
        >
          {" "}
          {/* Adding margin top */}
          <OwnAccordion data={accordionData} />

          <PageBox sx={{ margin: "0px auto", marginTop: "170px" }}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            width="100%"
            height="100%"
            display= "flex"
            flexDirection= "column"
  
          >

            
            <TypographyTitle variant="h2" align="center" >
            Still have questions?
            </TypographyTitle>

            <Typography
              variant="h4" align="center"
              sx={{ marginTop: '10px', marginBottom: '42px'  }}
            >
              Can’t find the answer you’re looking for? Please contact our friendly team.
            </Typography>

            <PrimaryButton
            text="Contact us"
            onClick={() => { 
              //setSelected("donate");

              console.log("");
            }}

          />

          </Grid>{" "}
        </PageBox  >
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default HowItWorks;
