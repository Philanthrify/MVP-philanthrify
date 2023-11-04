import React, { useState } from "react";
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
} from "@mui/material";
import FormBox from "@/components/FormBox";
import FormStyles from "@/components/FormsUI";
import TypographyTitle from "@/components/Title";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpIcon from "@/components/HelpIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import TextFieldWrapper from "@/components/FormsUI/Textfield";
const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username should be of minimum 3 characters length")
    .max(30, "Username should not exceed 30 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [regError, setRegError] = useState("");

  const handleMouseDownPassword = () => {
    // event.preventDefault();
    setShowPassword(true);
  };

  const handleMouseUpPassword = () => {
    setShowPassword(false);
  };

  const handleMouseDownConfirmPassword = () => {
    // event.preventDefault();
    setShowConfirmPassword(true);
  };

  const handleMouseUpConfirmPassword = () => {
    setShowConfirmPassword(false);
  };
  const { palette } = useTheme();
  const textFieldProps = FormStyles();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios({
        method: "post",
        url: "http://localhost:1337/auth/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
      })
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          setRegError(
            "There was an error during registration: " +
              error.response.data.error
          );
        });
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
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={10}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={""}
                  sx={{ ...textFieldProps.textField }}
                  InputProps={
                    {
                      // endAdornment: (
                      //   <>
                      //     <HelpIcon
                      //       title="
                      //       Minimum of 3 characters in length and should not exceed 30 characters.
                      //       "
                      //     />
                      //   </>
                      // ),
                    }
                  }
                />
              </Grid>
              <Grid xs={10}>
                <FormHelperText
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                >
                  {formik.touched.username && formik.errors.username}
                </FormHelperText>
              </Grid>

              <Grid xs={10}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={""}
                  sx={{ ...textFieldProps.textField }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {/* <HelpIcon
                          title="
                          Must be valid email.
                          "
                        /> */}
                      </>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={10}>
                <FormHelperText
                  error={formik.touched.email && Boolean(formik.errors.email)}
                >
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </Grid>

              <Grid xs={10}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={""}
                  sx={{ ...textFieldProps.textField }}
                  InputProps={{
                    endAdornment: (
                      <>
                        <IconButton
                          edge="end"
                          color="primary"
                          aria-label="toggle password visibility"
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          onTouchStart={handleMouseDownPassword}
                          onTouchEnd={handleMouseUpPassword}
                          size="small" // Set size to small
                        >
                          <VisibilityIcon />
                        </IconButton>
                        {/* 
                        <HelpIcon
                          title="
                          Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
                          "
                        /> */}
                      </>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={10}>
                <FormHelperText
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </Grid>
              <Grid xs={10}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={""}
                  sx={{ ...textFieldProps.textField }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        edge="end"
                        color="primary"
                        aria-label="toggle password visibility"
                        onMouseDown={handleMouseDownConfirmPassword}
                        onMouseUp={handleMouseUpConfirmPassword}
                        onTouchStart={handleMouseDownConfirmPassword}
                        onTouchEnd={handleMouseUpConfirmPassword}
                        size="small" // Set size to small
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={10}>
                <FormHelperText
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                >
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </FormHelperText>
              </Grid>
              <Grid xs={10} padding="10px 0px">
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
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
