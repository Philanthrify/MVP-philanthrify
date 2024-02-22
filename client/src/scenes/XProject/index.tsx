import { fetchProject } from "@/redux/projectSlice";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";

import EditButton from "@/components/Button/EditButton";
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
import { useSnackbar } from "@/contexts/snackbarContext";
import { useDispatch, useSelector } from "@/redux/hooks";
import { updateProjectField } from "@/redux/projectSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectPageFields } from "./Project";
import ProjectSubtitle from "@/components/Project/ProjectSubtitle";

// import Transactions from "@/components/Project/Transactions";

const ProjectPage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openAlertSnackbar } = useSnackbar();
  const [projectFields, setProjectFields] = useState<ProjectPageFields>({
    title: { current: "", edit: false },
    backgroundAndGoals: { current: "", edit: false },
    solution: { current: "", edit: false },
    donationUsage: { current: "", edit: false },
    subtitle: { current: "", edit: false },
  });
  const project = useSelector((state: RootState) => state.project.project);
  const isProjectLead = project?.membershipBool || false;
  const { projectId } = useParams<{ projectId: string }>();
  const userCharity = useSelector((state: RootState) => state.auth.charity);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
    }
  }, [dispatch, projectId]);

  // This function runs when the user clicks the edit button on each field in order to edit
  // it handles flipping the field into editing mode
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const fieldName = event.currentTarget.name as keyof ProjectPageFields;

    if (project) {
      // get current value from project field so that it can be edited
      const current = project[fieldName];
      // flipping edit mode for this field
      if (fieldName in projectFields) {
        setProjectFields((prevState) => {
          const isEditing = prevState[fieldName].edit;
          // if currently editing then this is saving the new data so we want to update the backend
          if (isEditing) {
            // if we're saving the new text then we do api call first
            const res = sendNewValue(
              fieldName,
              projectFields[fieldName].current
            );
            // TODO:WARNING: console.log() just to overcome problem XD
            console.log(res);

            dispatch(
              updateProjectField({
                field: fieldName,
                value: projectFields[fieldName].current,
              })
            );
          }
          return {
            ...prevState,
            [fieldName]: {
              // If it's not in editing mode, use the 'current' value from 'project'
              // Otherwise, keep the 'current' value as it is in 'prevState'
              current: isEditing ? prevState[fieldName].current : current,
              edit: !isEditing,
            },
          };
        });
      }
    }
  };
  const updateField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const fieldName = event.currentTarget.name as keyof ProjectPageFields;

    if (fieldName in projectFields) {
      const newValue = event.currentTarget.value;
      setProjectFields((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          current: newValue,
        },
      }));
    }
  };
  // the api call to update the values in backend
  const sendNewValue = async (fieldName: string, newVal: string) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/project/${projectId}`, {
        [fieldName]: newVal,
      })
      .then((answer: AxiosResponse) => {
        console.log(answer.data.project);
        openAlertSnackbar(`${fieldName} successfully changed!`, "success");
        return answer.data.project;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        openAlertSnackbar("Something went wrong. Change rejected.", "error");
      });
  };
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
          spacing={2}
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
            <ProjectTitle
              editing={projectFields.title.edit}
              buttons={
                isProjectLead
                  ? [
                      <EditButton
                        name="title"
                        done={projectFields.title.edit}
                        onClick={handleButtonClick}
                      />,
                    ]
                  : []
              }
              projectFields={projectFields}
              updateField={updateField}
            />
          </Grid>{" "}
          <Grid item>
            <ProjectSubtitle
              editing={projectFields.subtitle.edit}
              buttons={
                isProjectLead
                  ? [
                      <EditButton
                        name="subtitle"
                        done={projectFields.subtitle.edit}
                        onClick={handleButtonClick}
                      />,
                    ]
                  : []
              }
              projectFields={projectFields}
              updateField={updateField}
            />
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
            <Challenge
              editing={projectFields.backgroundAndGoals.edit}
              buttons={
                isProjectLead
                  ? [
                      <EditButton
                        name="backgroundAndGoals"
                        done={projectFields.backgroundAndGoals.edit}
                        onClick={handleButtonClick}
                      />,
                    ]
                  : []
              }
              projectFields={projectFields}
              updateField={updateField}
            />
          </Grid>
          {/* Solution */}
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader
              header="Solution"
              buttons={
                isProjectLead
                  ? [
                      <EditButton
                        name="solution"
                        done={projectFields.solution.edit}
                        onClick={handleButtonClick}
                      />,
                    ]
                  : []
              }
            />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {project.solution && !projectFields.solution.edit && (
              <SectionText text={project.solution} />
            )}
            {project.solution && projectFields.solution.edit && (
              <TextField
                name="solution"
                multiline
                rows={4}
                value={projectFields.solution.current}
                onChange={updateField}
                sx={{
                  width: "80%",
                }}
              />
            )}
          </Grid>

          {/* Donation Usage */}
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader
              header="Breakdown of where donations go"
              buttons={
                isProjectLead
                  ? [
                      <EditButton
                        name="donationUsage"
                        done={projectFields.donationUsage.edit}
                        onClick={handleButtonClick}
                      />,
                    ]
                  : []
              }
            />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {project.donationUsage && !projectFields.donationUsage.edit && (
              <SectionText text={project.donationUsage} />
            )}
            {project.donationUsage && projectFields.donationUsage.edit && (
              <TextField
                name="donationUsage"
                multiline
                rows={4}
                value={projectFields.donationUsage.current}
                onChange={updateField}
                sx={{
                  width: "80%",
                }}
              />
            )}
          </Grid>
          {/* Future Impact
          <Grid item sx={{ width: "100%" }}>
            <SectionHeader
              header="Future Impact"
              buttons={
                isProjectLead
                  ? [
                      <EditButton
                        name="futureImpact"
                        done={projectFields.futureImpact.edit}
                        onClick={handleButtonClick}
                      />,
                    ]
                  : []
              }
            />
          </Grid> */}
          {/* <Grid item sx={{ width: "100%" }}>
            {project.futureImpact && !projectFields.futureImpact.edit && (
              <SectionText text={project.futureImpact} />
            )}
            {project.futureImpact && projectFields.futureImpact.edit && (
              <TextField
                name="futureImpact"
                multiline
                rows={4}
                value={projectFields.futureImpact.current}
                onChange={updateField}
                sx={{
                  width: "80%",
                }}
              />
            )}
          </Grid> */}
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
