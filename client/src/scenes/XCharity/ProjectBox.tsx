import { ProjectShort } from "@/models/project";
import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";
import LocationText from "@/components/Project/LocationText";
import PageviewIcon from "@mui/icons-material/Pageview";

type ProjectBoxProps = {
  project: ProjectShort;
};
const ProjectBox = (props: ProjectBoxProps) => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const goToProject = () => {
    navigate(`/project/${props.project.id}`);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer", // Cursor style
        backgroundColor: palette.background.light, // Background color

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
      <Grid container spacing={2}>
        <Grid container item md={3} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar sx={{ bgcolor: "pink" }}>
              <PageviewIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Grid container direction="column" item md={8} justifyContent="center">
          {props.project.country && (
            <Grid item>
              <LocationText text={props.project.country} />
            </Grid>
          )}
          <Grid item>
            <Typography variant="h3">{props.project.title}</Typography>
          </Grid>
          <Grid item>
            {typeof props.project.currentAmount === "number" &&
              typeof props.project.targetAmount === "number" && (
                <ProgressBar
                  required={props.project.currentAmount}
                  fulfilled={props.project.targetAmount}
                />
              )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectBox;
