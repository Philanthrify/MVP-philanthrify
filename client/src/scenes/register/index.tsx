import FormBox from "@/components/FormBox";
import TypographyTitle from "@/components/Title";
import { Signup } from "@/models/Signup";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { useSnackbar } from "@/contexts/snackbarContext";

// an own type for the payload
interface MyTokenPayload extends JwtPayload {
  email?: string;
  charityId?: string;
  charityName?: string;
}

const Register = () => {
  const { openAlertSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [linkSignup, setLinkSignup] = useState<boolean>(false); // boolean to know whether they're using a charity invite link
  const [personalizedMessage, setPersonalizedMessage] = useState<string>(""); // the message they'll see if they're using a signup link
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
  useEffect(() => {
    // Validate token and set initial step
    if (token) {
      try {
        //  decode the token to ensure token is right
        const decoded = jwtDecode<MyTokenPayload>(token);
        console.log(decoded);
        // check the token has the right fields
        setData({
          ...data,
          userType: "CHARITY",
          email: decoded.email,
          charityId: decoded.charityId,
          token: token,
        });
        setLinkSignup(true);
        setPersonalizedMessage(
          `Thanks for following the link, ${decoded.email} to join ${decoded.charityName}! We'd just like to gather some quick details about you.`
        );
        // Move directly to step 3
        setCurrentStep(2);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, [token]);
  // when signup vals are edited
  const updateData = (updatedData: Signup) => {
    setData(updatedData);
  };
  // getting to next page (first page only)
  const handleNextStepOne = () => {
    if (currentStep <= 2 && data.userType === "CHARITY") {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(2);
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
      // this can either be a user joining a charity or a full charity onboarding
      if (linkSignup) {
        axios({
          method: "post",
          url: `${import.meta.env.VITE_API_URL}/team-invite/signup-with-link`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(updatedData),
        })
          .then((response) => {
            openAlertSnackbar("Success, you are now a member!", "success");

            navigate("/login");
          })
          .catch((error) => {
            setRegError(
              "There was an error during registration: " +
                error.response.data.error
            );
          });
      } else {
        // when onboarding a charity, the root is always CHARITYHEAD
        updatedData.charityHead = true;
        axios({
          method: "post",
          url: `${import.meta.env.VITE_API_URL}/auth/signup-charity`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(updatedData),
        })
          .then((response) => {
            openAlertSnackbar("Success, you are now a member!", "success");
            navigate("/login");
          })
          .catch((error) => {
            setRegError(
              "There was an error during registration: " +
                error.response.data.error
            );
          });
      }
    } else if (updatedData.userType === "DONOR") {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/auth/signup-donor`,
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

          {personalizedMessage ? (
            <TypographyTitle variant="h4" align="center" padding="15px 0">
              {personalizedMessage}
            </TypographyTitle>
          ) : (
            <TypographyTitle variant="h4" align="center" padding="15px 0">
              Join our community and explore the benefits!
            </TypographyTitle>
          )}
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
