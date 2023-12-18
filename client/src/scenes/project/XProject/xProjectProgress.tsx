import { Box, Divider, Grid, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import TypographySmallText from "@/components/SmallText";
import ProgressBar from "@/components/ProgressBar";

const XProjectProgress = () => {
  const { palette } = useTheme();
  const project = useSelector((state: RootState) => state.project.project);
  if (!project) {
    return <></>;
  }
  return (
    <Grid
      container
      xs={12}
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        borderRadius: "1rem",
        maxWidth: "400px",
        height: "500px",
        backgroundColor: palette.background.light,
        position: "sticky",
        top: "20px",
        // Add any additional styling you need here
      }}
    >
      {project.targetAmount && (
        <TypographySmallText variant="h3" align="center" padding="15px 0">
          £{project.targetAmount.toLocaleString()} target
        </TypographySmallText>
      )}
      <Divider sx={{ borderColor: palette.white.middle }} />
      {project.currentAmount && (
        <TypographySmallText variant="h3" align="center" padding="15px 0">
          £{project.currentAmount.toLocaleString()} raised
        </TypographySmallText>
      )}
      {project.currentAmount && project.targetAmount && (
        <ProgressBar
          required={project.currentAmount}
          fulfilled={project.targetAmount}
        />
      )}
    </Grid>
  );
};

export default XProjectProgress;
