import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import ProjectFormPageOne from "./ProjectFormPageOne";
import ProjectFormPageTwo from "./ProjectFormPageTwo";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { nextPage, previousPage } from "@/redux/projectFormSlice";
import FormBox from "@/components/FormBox";
import TypographyTitle from "@/components/Title";
import { selectToken } from "@/redux/authSlice";
import axios from "axios";

// TODO: add validation for links including the 'http...' format, also for tags
const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  challenge: yup.string().required("Challenge is required"),
  solution: yup.string().required("Solution is required"),
  donationUsage: yup.string().required("Donation Usage is required"),
  futureImpact: yup.string().required("Future Impact is required"),

  targetAmount: yup
    .number()
    .required("Target amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
});

const CreateProjectForm: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const totalSteps = 2;
  const currentPage = useSelector(
    (state: RootState) => state.projectForm.currentPage
  );

  const steps = ["Project Details", "Upload Photo"];
  const handleNext = () => {
    dispatch(nextPage());
  };

  const handleBack = () => {
    dispatch(previousPage());
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      challenge: "",
      solution: "",
      donationUsage: "",
      futureImpact: "",
      links: [],
      listOfTags: [],
      targetAmount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (currentPage < totalSteps) {
        handleNext();
      } else {
        // Final submission
      }

      // try {
      //   const submissionValues = { ...values };

      //   // Submit form data without the image
      //   const formDataResponse = await axios({
      //     method: "post",
      //     url: "http://localhost:1337/project",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: token,
      //     },
      //     data: JSON.stringify(submissionValues),
      //   });
      //   console.log("Form data submitted:", formDataResponse);

      // } catch (error) {
      //   console.log(error);
      // }
    },
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Grid xs={8}>
        <FormBox>
          <TypographyTitle variant="h1" align="center" padding="15px 0">
            Submit New Project:
          </TypographyTitle>
          <Stepper activeStep={currentPage - 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {currentPage === 1 && <ProjectFormPageOne />}
            {currentPage === 2 && <ProjectFormPageTwo />}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={currentPage === 1}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {currentPage === steps.length ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default CreateProjectForm;
