import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Project } from "@/models/project";
import { RootState } from "@/redux/store";
import { fetchProject } from "@/redux/projectSlice";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectToken } from "@/redux/authSlice";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TypographyTitle from "@/components/Title";
import { useDispatch, useSelector } from "@/redux/hooks";
import XProjectProgress from "./xProjectProgress";
const ProjectPage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project.project);
  const loading = useSelector((state: RootState) => state.project.loading);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
    }
  }, [dispatch, projectId]);
  // if not found the project yet then return loading screen
  if (!project) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: "20px",
        marginBottom: "20px",
        width: "90%",
        margin: "auto",
      }}
    >
      {/* Main content */}
      <Grid
        container
        item
        xs={12}
        spacing={2}
        width="100%"
        height="510px"
        sx={{
          backgroundColor: palette.background.light,
          borderRadius: "1rem",
          margin: "0 auto 20px",
          padding: "20px",
        }}
      >
        {/* Left Side */}
        <Grid item md={6} xs={6}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#063970",
              justifyContent: "center",
              alignItems: "center",
              // Add any additional styling you need here
            }}
          >
            Image Here
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item md={6} xs={6}>
          {" "}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#063970",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              // Add any additional styling you need here
            }}
          >
            {project.country && (
              <div>
                <LocationOnOutlinedIcon />
                {project.country}
              </div>
            )}
            {project.title && (
              <div>
                <TypographyTitle variant="h2" align="center" padding="15px 0">
                  {project.title}
                </TypographyTitle>
              </div>
            )}
            <Box
              height="100px"
              width="100%"
              sx={{ backgroundColor: "#64F2A4" }}
            >
              Charity Logo Here
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* text on the left and progressbar on right */}
      <Grid container item xs={12} spacing={2} sx={{ width: "90%" }}>
        <Grid item xs={7}>
          <Box
            sx={{
              width: "100%",
              height: "10000px",
              backgroundColor: "#063970",
              // Add any additional styling you need here
            }}
          ></Box>
        </Grid>
        <Grid item xs={5}>
          <XProjectProgress />
        </Grid>
        {/* challenge */}
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
