import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Project } from "../Project";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/authSlice";

const ProjectPage = () => {
  const token = useSelector(selectToken);

  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const getProjectById = async (
    projectId: string | undefined
  ): Promise<Project | null> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need here
          Authorization: token, // Example for an auth token
        },
      };
      console.log(token);
      const response = await axios.get<Project>(
        `http://localhost:1337/project/${projectId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProjectById(projectId);
      if (projectData) {
        console.log(projectData);
        setProject(projectData);
      }
    };

    fetchProject();
  }, [projectId]);

  return (
    <Grid container spacing={2}>
      {/* Main content */}
      <Grid container item xs={12} spacing={3} padding={3}>
        {/* Left Side */}
        <Grid item md={8} xs={12}>
          <Paper elevation={3}>
            {/* Project Image */}
            <img src="/path/to/project/image.jpg" alt="Project" width="100%" />
            {/* Tags */}
            <Box display="flex" justifyContent="start" flexWrap="wrap" p={2}>
              {/* Map through your tags and display them */}
            </Box>
            {/* Project Details */}
            <Box p={2}>
              {/* Each section can be a Typography component */}
              <Typography variant="h5">Challenge</Typography>
              <Typography paragraph>{/* Content */}</Typography>

              <Typography variant="h5">Solution</Typography>
              <Typography paragraph>{/* Content */}</Typography>

              {/* ... Other sections */}
            </Box>
          </Paper>
        </Grid>

        {/* Right Side */}
        <Grid item md={4} xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Project Title and Details */}
            <Typography variant="h4">{/* Title */}</Typography>
            <Typography variant="body1">
              {/* Location and other details */}
            </Typography>

            {/* Donation Progress */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              my={2}
            >
              <CircularProgress variant="determinate" value={40} size={100} />
              <Box>
                <Typography
                  variant="body1"
                  component="div"
                  color="text.secondary"
                >
                  {/* Donation progress text */}
                </Typography>
              </Box>
            </Box>

            {/* Donation Amounts */}
            <Typography variant="h6">{/* Amount Raised */}</Typography>

            {/* Share and Donate Buttons */}
            <Button variant="contained" color="primary">
              {/* Share */}
            </Button>
            <Button variant="contained" color="secondary">
              {/* Donate */}
            </Button>

            {/* Donors List */}
            <Box>{/* Map through donors and display them */}</Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        {/* Your footer components */}
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
