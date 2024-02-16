import TypographySmallText from "@/components/SmallText";
import { useSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Divider, Grid, useTheme } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import PhilanthrifyLogo from "../Icons/PhilanthrifyLogo";
import ProgressRing from "./ProgressRing";

const SideFloater = () => {
  const { palette } = useTheme();
  const project = useSelector((state: RootState) => state.project.project);

  console.log(project);
  console.log(project?.currentAmount);
  console.log(project?.targetAmount);
  console.log(project?.currentAmount && project.targetAmount);
  if (
    project &&
    project.currentAmount !== undefined &&
    project.targetAmount !== undefined
  ) {
    const percentRaised = (project.currentAmount / project.targetAmount) * 100;
    console.log(percentRaised);
    return (
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          borderRadius: "1.75rem",
          maxWidth: "400px",
          height: "auto",
          
          backgroundColor: palette.background.light,
          position: "sticky",
          //marginLeft: "20px",
          top: "40px",
          // Add any additional styling you need here
        }}
      >
        <Grid
          container
          item
          spacing={3}
          direction="column"
          justifyContent="flex-start"
          alignItems="left"
          sx={{ marginBottom: "30px"}}
        >
          <Grid item>
            <TypographySmallText variant="h3" align="left" marginTop= "30px" marginLeft= "30px" color= "#FFFFFF" >
              £{project.targetAmount.toLocaleString()} target
            </TypographySmallText>
          </Grid>
          <Grid
            item
            sx={{ width: "95%", padding: "15px 0px", alignItems: "center", marginLeft: "30px", marginRight: "30px" }}
          >
            <Divider
              sx={{
                alignSelf: "center",
                borderColor: "#535766",
                width: "90%",
          
              }}
            />
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            spacing={3}
            marginBottom={1}
          >
            <Grid item>
              {" "}
              <ProgressRing
                percentage={percentRaised}
                doneColour="#099250"
                unDoneColour="#394056"
                innerColour="#292E3F"
                radius={50}
              />
            </Grid>

            {project.currentAmount === 0 ? (
              <Grid
                item
                container
                lg={6}
                md={6}
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Grid item>
                  {" "}
                  <PhilanthrifyLogo width={"41"} height={"36"} />
                </Grid>
                <Grid item>
                  <TypographySmallText
                    variant="h3"
                    // align="center"
                    padding="0px 0"
                    color="#FFFFFF"
                    
                  >
                    Be the first donor
                  </TypographySmallText>
                </Grid>

                <></>
              </Grid>
            ) : (
              <Grid item container lg={6} md={6} alignItems="center">
                <Grid item>
                  <TypographySmallText
                    variant="h3"
                    align="center"
                    padding="15px 0"
                  >
                    £{project.currentAmount.toLocaleString()} raised
                  </TypographySmallText>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            spacing={0}
            direction="row"
            justifyContent="space-between"
          >
            <Grid
              item
              xs={true}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <PrimaryButton
                text="Share"
                onClick={() => {
                  console.log("Share");
                }}
                sx={{ color: palette.white.light,
                  backgroundColor: "#394056",
                  width: "162px",
                  "&:hover": {
                    color: palette.white.light,
                    backgroundColor: "#4C5572",
                    transform: "scale(0.96)",
                    transition: "transform 0.17s",
                    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }, }}
              />
            </Grid>{" "}
            <Grid
              item
              xs={true}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <PrimaryButton
                text="Donate"
                onClick={() => {
                  console.log("");
                }}
                sx={{ width: "162px", }}
              />
            </Grid>{" "}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default SideFloater;
