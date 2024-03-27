import FormBox from "@/components/FormBox";
import { Grid, Step, StepLabel, Stepper } from "@mui/material";

import TypographyTitle from "@/components/Title";
import { Typography } from "@mui/material";

import { v4 as uuidv4 } from "uuid";

import { selectToken } from "@/redux/authSlice";
import { useSelector } from "react-redux";

import { Project } from "@/models/project";
import { RootState } from "@/redux/store";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "@/contexts/snackbarContext";

const steps = ["Project Information", "Upload Image"];
const CreateProjectForm = () => {
  const charity = useSelector((state: RootState) => state.auth.charity);
  const navigate = useNavigate();
  const [data, setData] = useState<Project>({
    charityId: charity ? charity.ukCharityNumber : "",
    // WARNING: for now assuming that the user has only one charity, this project will be posted for the first charity
    // which appears in the users list of charities, database output will not be as expected if user has more than one
    // charity
    title: "",
    country: "",
    backgroundAndGoals: "",
    solution: "",
    donationUsage: "",
    subtitle: "",
    link: [{ id: uuidv4(), webLink: "", socialMedia: "Facebook" }],
    tag: [],
    endDate: null,
    targetAmount: 0,
  });
  const token = useSelector(selectToken);
  const [currentStep, setCurrentStep] = useState(0);
  const [skipped] = useState(new Set<number>());
  const { openAlertSnackbar } = useSnackbar();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = (updatedData: Project) => {
    console.log(updatedData);
    setData(updatedData);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: Project) => {
    //console.log(data);
    const { image, ...dataWithoutImage } = data;

    axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/project`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: JSON.stringify(dataWithoutImage),
    }).then((response) => {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
    
        axios({
          method: "post",
          url: `${import.meta.env.VITE_API_URL}/project/upload-project-image`,
          params: { projectId: response.data.project.id },
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
          .then(() => {
            console.log("Image upload successful");
            openAlertSnackbar("Project created", "success");
            navigate(`/project/${response.data.project.id}`);
          })
          .catch((uploadError) => {
            console.log(uploadError);
            openAlertSnackbar("Image upload failed", "error");
          });
      } else {
        openAlertSnackbar("Project created", "success");
        navigate(`/project/${response.data.project.id}`);
      }
    });
  };

  const { palette } = useTheme();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      marginTop="16px" // Add marginTop here for spacing
      marginBottom="128px"
    >
      {/* TODO: do this a bit later */}
      <Grid xs={8}>
        <FormBox>
          <TypographyTitle variant="h1" align="center" paddingTop="110px">
            Fund a project
          </TypographyTitle>

          <Typography
            variant="body2"
            align="center"
            marginTop="10px"
            marginBottom="50px"
          >
            Add details to your funding, this will help you to fund fast your
            project
          </Typography>

          <Grid container justifyContent="center" padding="30px">
            <Stepper
              activeStep={currentStep}
              // TODO: set these to be a nicer colourscheme later
            >
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          {currentStep === 0 && (
            <StepOne projectData={data} onSubmit={handleNext} />
          )}
          {currentStep === 1 && (
            <>
              <StepTwo
                projectData={data}
                handleBack={handleBack}
                onSubmit={onSubmit}
              />
            </>
          )}
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default CreateProjectForm;
