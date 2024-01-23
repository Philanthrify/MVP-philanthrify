import FormBox from "@/components/FormBox";
import { Alert, Grid, Snackbar, Step, StepLabel, Stepper } from "@mui/material";

import TypographyTitle from "@/components/Title";
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

const steps = ["Project Information", "Upload Image"];
const CreateProjectForm = () => {
  const charity = useSelector((state: RootState) => state.auth.charity);
  const [data, setData] = useState<Project>({
    charityId: charity ? charity.ukCharityNumber : "",
    // WARNING: for now assuming that the user has only one charity, this project will be posted for the first charity
    // which appears in the users list of charities, database output will not be as expected if user has more than one
    // charity
    title: "",
    country: "",
    challenge: "",
    solution: "",
    donationUsage: "",
    futureImpact: "",
    link: [{ id: uuidv4(), webLink: "", socialMedia: "Facebook" }],
    tag: [],
    endDate: null,
    targetAmount: 0,
  });
  const [open, setOpen] = useState(false);
  const token = useSelector(selectToken);
  const [currentStep, setCurrentStep] = useState(0);
  const [skipped] = useState(new Set<number>());

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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
    console.log(data);
    const { image, ...dataWithoutImage } = data;

    axios({
      method: "post",
      url: "http://localhost:1337/project",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: JSON.stringify(dataWithoutImage),
    })
      .then((response) => {
        console.log(response);
        if (image) {
          const formData = new FormData();
          formData.append("image", image);
          console.log(response.data.project.id);
          setOpen(true);
          return axios({
            method: "post",
            url: `http://localhost:1337/project/upload-project-image`, // Change to your image upload endpoint
            params: { projectId: response.data.project.id },
            headers: {
              Authorization: token,
              // "Content-Type": "multipart/form-data",
            },
            data: formData,
          });
        }
      })
      .catch((error) => {
        console.log(error);
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
    >
      {/* TODO: do this a bit later */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Grid xs={8}>
        <FormBox>
          <TypographyTitle variant="h1" align="center" padding="15px 0">
            Submit New Project:
          </TypographyTitle>
          <Grid container justifyContent="center" padding="30px">
            <Stepper
              activeStep={currentStep}
              // TODO: set these to be a nicer colourscheme later
              sx={{
                ".MuiStepLabel-label": {
                  color: palette.grey[500],
                },
                ".MuiStepIcon-root": {
                  color: palette.grey[500],
                },
                ".MuiStepLabel-label.Mui-active": {
                  color: palette.grey[500],
                },
                ".MuiStepLabel-label.Mui-completed": {
                  color: palette.grey[500],
                },

                width: "70%",
              }}
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
