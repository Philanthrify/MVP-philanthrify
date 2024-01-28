import FormBox from "@/components/FormBox";
import ErrorComponent from "@/components/FormError";
import FormStyles from "@/components/FormsUI";
import TypographyTitle from "@/components/Title";
import { login } from "@/redux/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
const validationSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
interface LocationState {
  from: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = location.state as LocationState | undefined;
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { palette } = useTheme();
  const textFieldProps = FormStyles();
  const from = state?.from || "/";
  console.log(from);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
        // withCredentials: true,
      })
        .then((response) => {
          console.log(
            "🚀 ~ .then ~ response.data.loggedInCharity:",
            response.data.loggedInCharity
          );
          dispatch(
            login({
              token: response.data.token,
              firstname: response.data.firstname,
              email: response.data.email,
              userType: response.data.userType,
              charity: response.data.loggedInCharity ?? null,
              charities: response.data.charity,
              projects: response.data.projects,
            })
          );
          navigate(from);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          // Handle error
          setLoginError(
            "There was an error during login: " + error.response.data.message
          );
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
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                        <VisibilityOffIcon sx={{ color: "primary.main" }} />
                      ) : (
                        <VisibilityIcon sx={{ color: "primary.main" }} />
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
