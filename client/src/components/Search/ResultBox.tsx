import { Project } from "@/models/project";
import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import LocationText from "../Project/LocationText";

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
      {typeof props.project.currentAmount === "number" &&
        typeof props.project.targetAmount === "number" && (
          <ProgressBar
            required={props.project.currentAmount}
            fulfilled={props.project.targetAmount}
          />
        )}
      {props.project.country && <LocationText text={props.project.country} />}
      <div>{props.project.title}</div>
    </Box>
  );
};

export default ResultBox;
