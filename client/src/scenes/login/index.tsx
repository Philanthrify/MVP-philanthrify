import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Grid,
  TextField,
  IconButton,
  useTheme,
  Typography,
  Box,
} from "@mui/material";
import FormBox from "@/components/FormBox";
import FormStyles from "@/components/FormsUI";
import ErrorComponent from "@/components/FormError";
import TypographyTitle from "@/components/Title";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { jwtDecode } from "jwt-decode";

const validationSchema = yup.object({
  username: yup.string().required("username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { palette } = useTheme();
  const textFieldProps = FormStyles();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios({
        method: "post",
        url: "http://localhost:1337/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
        // withCredentials: true,
      })
        .then((response) => {
          const token = response.data.token;
          const username = response.data.username;
          console.log(token);
          dispatch(
            login({
              token: token,
              username: username,
              userType: jwtDecode(token).userType,
            })
          );
          localStorage.setItem("token", token);
          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle error
          setLoginError("There was an error during login: " + error.response);
          // You can display an error message to the user based on the error response
        });
    },
  });
  console.log(textFieldProps.textField);
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
            Log In
          </TypographyTitle>
          <TypographyTitle variant="h4" align="center" padding="15px 0">
            Welcome back to our community!
          </TypographyTitle>
          {loginError && (
            // <Typography color="error" align="center" padding="15px 0">
            //   {loginError}
            // </Typography>
            <ErrorComponent message={loginError} />
          )}
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              justifyContent="center"
              alignItems="center"
              width="70%"
            >
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
                helperText={formik.touched.username && formik.errors.username}
                sx={{
                  ...textFieldProps.textField,
                  width: textFieldProps.textFieldWidth,
                }}
              />

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
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  ...textFieldProps.textField,
                  width: textFieldProps.textFieldWidth,
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge="end"
                      color="primary"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      size="small" // Set size to small
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />

              <Grid item xs={12} padding="10px 0px">
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Log In
                </Button>
              </Grid>
              <Grid xs={10} padding="10px 0px">
                <Typography
                  variant="body2"
                  align="center"
                  color={palette.grey[500]}
                >
                  Don't have an account yet?{" "}
                  <Link to="/register">Register</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default Login;
