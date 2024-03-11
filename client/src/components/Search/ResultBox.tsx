import { Project } from "@/models/project";
import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import LocationText from "../Project/LocationText";
import { useEffect, useState } from "react";
import line from "@/assets/line.png";

type ResultBoxProps = {
  project: Project;
  sx?: any;
};

const ResultBox = (props: ResultBoxProps) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [imageToDisplay, setImageToDisplay] = useState(`url(${line})`);

  console.log(palette.background.light);
  const goToProject = () => {
    navigate(`/project/${props.project.id}`);
  };
  
  useEffect(() => {
    const imageLoad = async () => {
      try {
        const response = await fetch(`https://res.cloudinary.com/dl1zphjjk/image/upload/project_images/main/${props.project.id}`);
        if (response.ok) {
          // Image exists
          setImageToDisplay(`https://res.cloudinary.com/dl1zphjjk/image/upload/project_images/main/${props.project.id}`);
          console.log("🚀 ~ imageLoad ~ response:", response)
        }
      } catch (error) {
        console.error('Error checking image:', error);
      }
    };
    imageLoad();
  }, [props.project.id]);

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
          backgroundColor: "#394056", // Hover background color
          transform: "scale(1.02)",
          transition: "transform 0.17s ease-in-out",
        },
        borderRadius: "1.5rem",
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
          borderRadius: "1.5rem 1.5rem 0 0", // Top corners rounded
          backgroundSize: "cover",
          backgroundPosition: "center", // Center the background image
          backgroundImage: `url(${imageToDisplay})`, // Use the imported image
          // Add any additional styling for the placeholder here
        }}
      >
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
