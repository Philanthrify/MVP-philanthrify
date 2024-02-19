import TypographySmallText from "@/components/SmallText";
import { useSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Divider, Grid, useTheme } from "@mui/material";
import PrimaryButton from "../Button/PrimaryButton";
import PhilanthrifyLogo from "../Icons/PhilanthrifyLogo";
import ProgressRing from "./ProgressRing";
import SecondaryButton from "../Button/SecondaryButton";

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
      padding= "30px 30px 20px 30px"

        sx={{
          borderRadius: "1.75rem",
          maxWidth: "400px",
          height: "auto",
          
          backgroundColor: palette.background.light,
          position: "sticky",
          top: "30px",
        }}
      >
        <Grid
          container
          item
    
          direction="column"
          justifyContent="flex-start"
          alignItems="left"
          
        >
          <Grid item>
            <TypographySmallText 
            variant="h3" 
            align="left" 
            
            
            
           sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 18, }} // Use sx prop to specify color
>

              £{project.targetAmount.toLocaleString()} target
            </TypographySmallText>
          </Grid>
          <Grid
            item
            sx={{ width: "100%", alignItems: "center" }}
          >
            <Divider
              sx={{
                alignSelf: "center",
                borderColor: "#535766",
                width: "100%",
                marginTop: "10px",
                marginBottom: "30px",
          
              }}
            />
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="left"
            alignItems="flex-start"
            spacing={3}
          >
            <Grid item>
              {" "}
              <ProgressRing
                percentage={percentRaised}
                doneColour="#099250"
                unDoneColour="#394056"
                innerColour="#232531"
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
                spacing={1.25}
                marginTop={1}
              >
                <Grid item>
                  {" "}
                  <PhilanthrifyLogo width={"41"} height={"36"} />
                </Grid>
                <Grid item>
                  <TypographySmallText
                    variant="body2"
                    // align="center"
                    
                    sx={{ color: "#FFFFFF", fontWeight: 400, fontSize: 18, }} // Use sx prop to specify color

                    
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
            spacing={3.25}
            direction="row"
            justifyContent="center"
          >
            <Grid
              item
              xs={true}
              style={{ display: "flex", justifyContent: "center" }}
            >
              
            </Grid>{" "}
            <Grid
              item
              xs={true}
              style={{ display: "flex", justifyContent: "center",  }}
            >

              <SecondaryButton
                text="Share"
                onClick={() => {
                  console.log("");
                }}
                sx={{ width: "154px", marginRight: "20px", }}
              />

              <PrimaryButton
                text="Donate now"
                onClick={() => {
                  console.log("");
                }}
                sx={{ width: "154px", }}
              />
              
            </Grid>{" "}
            <Grid item>
                  <TypographySmallText
                    variant="body2"
                    align="center" 
                    
                    
                    sx={{ color: "#A4A6AD", fontWeight: 200, fontSize: 12, fontStyle: "italic" }} // Use sx prop to specify color

                    
                  >
                    No fees, 100% goes to the project!
                  </TypographySmallText>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default SideFloater;
