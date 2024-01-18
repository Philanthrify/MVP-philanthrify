import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Box,
  Typography,
  useTheme,
  Grid,
  TextField,
  FormHelperText,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FormBox from "@/components/FormBox";
import FormStyles from "@/components/FormsUI";
import TypographyTitle from "@/components/Title";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupButton from "@/components/Button/SignupButton";

import { Signup } from "@/models/Signup";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const Register = () => {
  const [data, setData] = useState<Signup>({
    userType: "DONOR",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    ukCharityNumber: null,
    charityName: "",
  });
  const navigate = useNavigate();
  const [regError, setRegError] = useState("");
  const { palette } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  // when signup vals are edited
  const updateData = (updatedData: Signup) => {
    setData(updatedData);
  };
  // getting to next page (first page only)
  const handleNextStepOne = () => {
    if (currentStep <= 2) {
      setCurrentStep(currentStep + 1);
    }
  };
  // getting to next page (other pages need to work with formik)
  const handleNextRest = (updatedData: Signup) => {
    setData(updatedData);
    if (currentStep <= 2) {
      setCurrentStep(currentStep + 1);
    }
  };
  // getting to the page before
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const onSubmit = (updatedData: Signup) => {
    if (updatedData.userType === "CHARITY") {
      // when onboarding a charity, the root is always CHARITYHEAD
      updatedData.charityHead = true;
      axios({
        method: "post",
        url: "http://localhost:1337/auth/signup-charity",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(updatedData),
      })
        .then((response) => {
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => {
          setRegError(
            "There was an error during registration: " +
              error.response.data.error
          );
        });
    } else if (updatedData.userType === "DONOR") {
      axios({
        method: "post",
        url: "http://localhost:1337/auth/signup-donor",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(updatedData),
      })
        .then((response) => {
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => {
          setRegError(
            "There was an error during registration: " +
              error.response.data.error
          );
        });
    }
  };

  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:16 ~ index ~ data:", data);
  }, [data]);
  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:16 ~ index ~ currentStep:", currentStep);
  }, [currentStep]);
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
            Sign Up
          </TypographyTitle>
          <TypographyTitle variant="h4" align="center" padding="15px 0">
            Join our community and explore the benefits!
          </TypographyTitle>
          {regError && (
            <Typography color="error" align="center" padding="15px 0">
              {regError}
            </Typography>
          )}

          {/* Formstuff */}
          <>
            {currentStep === 0 && (
              <StepOne
                data={data}
                updateData={updateData}
                handleNext={handleNextStepOne}
              />
            )}

            {currentStep === 1 && (
              <StepTwo
                data={data}
                updateData={updateData}
                handleNext={handleNextRest}
                handleBack={handleBack}
              />
            )}
            {currentStep === 2 && (
              <StepThree
                data={data}
                updateData={updateData}
                onSubmit={onSubmit}
                handleBack={handleBack}
              />
            )}
          </>

          <Box display="flex" alignItems="center" justifyContent="center">
            {" "}
            {/* Box for TOS and Privacy Policy */}
            <Typography variant="body2" color={palette.grey[500]}>
              By signing up, you agree to our
              <a href="/terms-of-service" color={palette.grey[500]}>
                {" "}
                Terms of Service{" "}
              </a>
              and
              <a href="/privacy-policy"> Privacy Policy</a>.
            </Typography>
          </Box>
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default Register;
