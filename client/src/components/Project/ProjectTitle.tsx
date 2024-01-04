import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Grid, Typography, useTheme } from "@mui/material";
import TypographyTitle from "../Title";

// This component is for the project title
const ProjectTitle = () => {
  const project = useSelector((state: RootState) => state.project.project);
  const { palette } = useTheme();
  return (
    <>
      {project?.title && (
        <TypographyTitle variant="h1" alignSelf="flex-start" padding="15px 0">
          {project.title}
        </TypographyTitle>
      )}
    </>
  );
};

export default ProjectTitle;
