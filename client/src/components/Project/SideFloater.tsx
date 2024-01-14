import { Box, Button, Divider, Grid, styled, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import TypographySmallText from "@/components/SmallText";
import ProgressBar from "@/components/ProgressBar";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import ProgressRing from "./ProgressRing";
import PhilanthrifyLogo from "../Icons/PhilanthrifyLogo";
import PrimaryButton from "../Button/PrimaryButton";

const SideFloater = () => {
  const { palette } = useTheme();
  const project = useSelector((state: RootState) => state.project.project);
  const buttonStyles = {
    minWidth: "80px",
    height: "60%",
    borderRadius: "1rem",
  };
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
          borderRadius: "1rem",
          maxWidth: "400px",
          height: "auto",
          backgroundColor: palette.background.light,
          position: "sticky",
          top: "20px",
          // Add any additional styling you need here
        }}
      >
        <Grid
          container
          item
          spacing={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <TypographySmallText variant="h3" align="center" padding="15px 0">
              £{project.targetAmount.toLocaleString()} target
            </TypographySmallText>
          </Grid>
          <Divider
            sx={{
              alignSelf: "center",
              borderColor: palette.white.middle,
              width: "90%",
            }}
          />
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item lg={6} md={6}>
              <ProgressRing
                percentage={percentRaised}
                doneColour="#099250"
                unDoneColour="#3B3B41"
                innerColour="#3B3B4166"
                radius={50}
              ></ProgressRing>
            </Grid>{" "}
            {project.currentAmount === 0 ? (
              <Grid item container lg={6} md={6} direction="column">
                <Grid item>
                  {" "}
                  <PhilanthrifyLogo width={"41"} height={"36"} />
                </Grid>
                <Grid item>
                  <TypographySmallText
                    variant="h3"
                    align="center"
                    padding="15px 0"
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
            spacing={2}
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
                  console.log("");
                }}
                sx={{ width: "90%" }}
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
                sx={{ width: "90%" }}
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
