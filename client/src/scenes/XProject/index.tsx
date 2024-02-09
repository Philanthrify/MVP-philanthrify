import { fetchProject } from "@/redux/projectSlice";
import { RootState } from "@/redux/store";
import { Box, Button, CircularProgress, Grid, useTheme } from "@mui/material";

import Challenge from "@/components/Project/Challenge";
import InviteProjectMate from "@/components/Project/InviteProjectMate";
import LocationText from "@/components/Project/LocationText";
import ProjectTitle from "@/components/Project/ProjectTitle";
import SectionHeader from "@/components/Project/SectionHeader";
import SectionText from "@/components/Project/SectionText";
import SideFloater from "@/components/Project/SideFloater";
import Links from "@/components/Project/SocialMedia";
import Transactions from "@/components/Project/Transactions";
import Updates from "@/components/Project/Updates";
import { useDispatch, useSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditButton from "@/components/Button/EditButton";
// import Transactions from "@/components/Project/Transactions";

const ProjectPage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((state: RootState) => state.project.project);
  const { projectId } = useParams<{ projectId: string }>();
  const userCharity = useSelector((state: RootState) => state.auth.charity);
  useEffect(() => {}, [userCharity]);
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
    }
  }, [dispatch, projectId]);
  console.log("🚀 ~ project:", project, " ~ userCharity:", userCharity);

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

  const goToCharity = () => {
    // navigate(`/project/${props.project.id}`);
    navigate(`/charity/${project.charityId}`);
  };
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
        width: "100%",
        margin: "auto",
      }}
    >
      {/* Main content */}
      <Grid
        container
        item
        xs={12}
        spacing={3}
        width="1280px"
        height="510px"
        sx={{
          backgroundColor: palette.background.light,
          borderRadius: "1.75rem",
          maxWidth: "1280px",
          minHeight: "510px",
          marginTop: "28px",
          marginBottom: "96px",
          //margin: "0px 0px",
          //padding: "0px",
        }}
      >
        {/* Left Side */}
        <Grid
          container
          item
          md={6}
          xs={6}
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Grid item sx={{ width: "90%", height: "90%" }}>
            <Box
              sx={{
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
        </Grid>

        {/* Right Side */}
        <Grid
          container
          item
          md={6}
          xs={6}
          direction="column"
          justifyContent="center"
        >
          {" "}
          {/* the location of the project */}
          <Grid item>
            {" "}
            {project.country && <LocationText text={project.country} />}
          </Grid>
          <Grid item>
            <ProjectTitle />
          </Grid>
          <Grid item>
            <Button
              onClick={goToCharity}
              sx={{
                color: "black",

                backgroundColor: "#64F2A4",
                // height: "100px",
                // width: "100%",
              }}
            >
              Charity Logo Here
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* text on the left and progressbar on right */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        item
        xs={12}
        spacing={2}
        sx={{ width: "90%", marginBottom: "200px" }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
          item
          spacing={3}
          xs={8}
        >
          <Grid item sx={{ width: "100%" }}>
            <Challenge />
          </Grid>
          {/* Solution */}
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader header="Solution" />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {project.solution && <SectionText text={project.solution} />}
          </Grid>

          {/* Donation Usage */}
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader header="Donation Usage" />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {project.donationUsage && (
              <SectionText text={project.donationUsage} />
            )}
          </Grid>
          {/* Future Impact */}
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader header="Future Impact" />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {project.futureImpact && (
              <SectionText text={project.futureImpact} />
            )}
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader header="Links" />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Links />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader header="Transactions" />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Transactions />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <EditButton />
            <SectionHeader header="Updates" />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Updates />
          </Grid>
          {/* The teammates bit is only for those in said charity.*/}
          {userCharity?.ukCharityNumber &&
            project.charityId === userCharity?.ukCharityNumber && (
              <InviteProjectMate
                ukCharityNumber={userCharity.ukCharityNumber}
              />
            )}
        </Grid>
        <Grid item xs={4}>
          <SideFloater />
        </Grid>
        {/* challenge */}
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
