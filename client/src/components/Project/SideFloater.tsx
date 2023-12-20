import { Box, Divider, Grid, styled, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import TypographySmallText from "@/components/SmallText";
import ProgressBar from "@/components/ProgressBar";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
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
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <TypographySmallText variant="h3" align="center" padding="15px 0">
            £{project.targetAmount.toLocaleString()} target
          </TypographySmallText>
          <Divider
            sx={{
              alignSelf: "center",
              borderColor: palette.white.middle,
              // borderWidth: "2px",
              width: "90%",
              // padding: "25px 0px 75px 0px",
            }}
          />
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <ProgressRing
              percentage={percentRaised}
              doneColour="#099250"
              unDoneColour="#3B3B41"
              innerColour="#3B3B4166"
              radius={50}
            ></ProgressRing>
            <TypographySmallText variant="h3" align="center" padding="15px 0">
              £{project.currentAmount.toLocaleString()} raised
            </TypographySmallText>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default SideFloater;
