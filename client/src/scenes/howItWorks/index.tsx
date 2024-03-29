import avatar_group from "@/assets/avatar_group.png";
import PrimaryButton from "@/components/Button/PrimaryButton";
import PhilanthrifyLogoWithPinkCircle from "@/components/Icons/Artwork/PhilanthrifyLogoWithPinkCircle";
import OwnAccordion from "@/components/OwnAccordion";
import PageBox from "@/components/PageBox";
import TypographyTitle from "@/components/Title";
import { Grid, Typography } from "@mui/material";
import { accordionData } from "./howItWorks";

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
          sx={{ marginTop: "96px", marginBottom: "128px", maxWidth: "800px", backgroundcolor: "#1F2330", }}
        >
          {" "}
          {/* Adding margin top */}
          <OwnAccordion data={accordionData} />
          <PageBox sx={{ margin: "0px auto", marginTop: "170px" }}>
            <Grid
              container
              direction="column"
              //backgroundcolor= "#1F2330" 
              justifyContent="flex-start"
              alignItems="center"
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={avatar_group}
                alt="Avatar Group"
                style={{ marginBottom: "20px", width: "101px", height: "47px" }}
              />

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

              <PrimaryButton
                text="Contact us"
                onClick={() => {
                  //setSelected("donate");

                  console.log("");
                }}
              />
            </Grid>{" "}
          </PageBox>
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default HowItWorks;
