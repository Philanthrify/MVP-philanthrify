import OwnAccordion from "@/components/OwnAccordion";
import { accordionData } from "./howItWorks";
import { Grid, Typography, Button } from "@mui/material";
import PhilanthrifyLogoWithPinkCircle from "@/components/Icons/Artwork/PhilanthrifyLogoWithPinkCircle";
import PageBox from "@/components/PageBox";
import TypographyTitle from "@/components/Title";

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
            <Typography variant="h4" align="center">
              Philanthrify is a platform designed to aid charities in raising
              funds for impactful causes. Whether you're an individual, a group,
              or an organization, you can donate to any project and track the
              impact of your donations.
            </Typography>
          </Grid>{" "}
        </Grid>{" "}
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "96px", marginBottom: "128px", maxWidth: "800px" }}
        >
          <Grid item>
            {" "}
            {/* Adding margin top */}
            <OwnAccordion data={accordionData} />
          </Grid>
          <Grid item>
            <PageBox sx={{ marginTop: "170px" }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
              >
                <TypographyTitle variant="h2" align="center">
                  Still have questions?
                </TypographyTitle>

                <Typography
                  variant="h4"
                  align="center"
                  sx={{ marginTop: "10px", marginBottom: "42px" }}
                >
                  Can’t find the answer you’re looking for? Please contact our
                  friendly team.
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ width: "130px" }} // Set the width to 300px
                  type="submit"
                >
                  Contact us
                </Button>
              </Grid>{" "}
            </PageBox>
          </Grid>
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default HowItWorks;
