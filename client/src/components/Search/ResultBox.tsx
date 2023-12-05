import { Project } from "@/models/project";
import { Box, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
type ResultBoxProps = {
  project: Project;
  sx: any;
};

const ResultBox = (props: ResultBoxProps) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  console.log(palette.background.light);
  const goToProject = () => {
    navigate(`/project/${props.project.id}`);
  };
  return (
    <Box
      sx={{
        ...props.sx,
        width: "100%",
        height: "100%",
        cursor: "pointer", // Cursor style
        backgroundColor: palette.background.light, // Background color
        display: "flex", // Using Flexbox
        flexDirection: "column", // Stack children vertically
        justifyContent: "flex-start", // Distribute space
        alignItems: "flex-start",
        color: palette.grey[500], // Text color
        "&:hover": {
          backgroundColor: palette.background.lighter, // Hover background color
        },
        borderRadius: "1rem",
        boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,.8",
      }}
      onClick={goToProject}
    >
      {/* Image placeholder */}
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#063970", // Placeholder color
          borderRadius: "1rem 1rem 0 0", // Top corners rounded
          // Add any additional styling for the placeholder here
        }}
      >
        Image Here
      </Box>
      <ProgressBar
        required={props.project.currentAmount}
        fulfilled={props.project.targetAmount}
      />
      {props.project.country && (
        <div>
          <LocationOnOutlinedIcon />
          {props.project.country}
        </div>
      )}
      <div>{props.project.title}</div>
    </Box>
  );
};

type ProgressBarProps = {
  required: number;
  fulfilled: number;
};
const ProgressBar = (props: ProgressBarProps) => {
  const { palette } = useTheme();

  const progress = (props.required * 100) / props.fulfilled;
  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: "1rem",
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: palette.primary.main,
    borderRadius: "inherit",
    textAlign: "right" as const,
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };
  return (
    <>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${progress.toFixed()}%`}</span>
        </div>
      </div>
    </>
  );
};

export default ResultBox;
