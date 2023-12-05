import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Project } from "../Project";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/authSlice";

// grid layout
const gridTemplateLargeScreen = `
  "a a a a a a a b b b"
  "c d d d d d d e e e"
  "f f f f f f f g g g"
`;
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
  // if (!project) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={{
        gridTemplateColumns: "repeat(10, minmax(20px, 1fr))",
        gridTemplateRows: "300px 150px auto",
        gridTemplateAreas: gridTemplateLargeScreen,
      }}
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default ProjectPage;
