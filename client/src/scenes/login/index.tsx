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
import Cookies from "universal-cookie";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Charity, CharityMembership } from "@/models/charity";

const validationSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
interface LocationState {
  from: string;
}

interface UserToken extends JwtPayload {
  user: any;
}

interface CookiesToken extends UserToken {
  firstname: string;
  useremail: string;
  userType: string;
  loggedInCharity?: Charity;
  charity: CharityMembership[];
  projects: any[];
  exp: number;
  iat: number;
}

const Login = () => {
  const cookies = new Cookies();
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

  //CHECK EXISTENCE OF COOKIES FROM PREVIOUS SESSION
  //if exists a cookie then log in without having to log in
  const cookie = cookies.get("jwt_authorisation");
  if (cookie) {
    console.log(cookie);
    const decoded = jwtDecode<CookiesToken>(cookie);
    console.log("🚀 ~ Login ~ decoded:", decoded);

    //
    dispatch(
      login({
        token: cookie,
        firstname: decoded.user.firstname,
        email: decoded.user.email,
        userType: decoded.user.userType,
        charity: decoded.loggedInCharity ?? null,
        charities: decoded.user.charity,
        projects: decoded.user.projects,
      })
    );
    navigate(from);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("response");
          console.log(response.headers);
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

          const oneHourFromNow = new Date();
          oneHourFromNow.setTime(oneHourFromNow.getTime() + 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds
          cookies.set("jwt_authorisation", response.data.token, {
            expires: oneHourFromNow,
          });

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
      paddingTop="16px"
      paddingBottom="96px"
    >
      <Grid xs={8}>
        <FormBox>
          <TypographyTitle variant="h1" align="center" paddingTop="64px">
            Log in
          </TypographyTitle>
          <TypographyTitle variant="body2" align="center" color= "#A4A6AD" >
            Welcome back to our community
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
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  ...textFieldProps.textField,
                  //width: textFieldProps.textFieldWidth,
                  width: "100%", // Set the width to 100%
                  maxWidth: "320px", // Set the maximum width
                  marginTop: "10px",
                }}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                placeholder="**********"
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
                  //width: textFieldProps.textFieldWidth,
                  width: "100%", // Set the width to 100%
                  maxWidth: "320px", // Set the maximum width
                  marginTop: "10px",
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

            <Grid
            item
            xs={true}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            

            <PrimaryButton
              text="Login"
              type="submit"
              onClick={() => {
                console.log("");
              }}
              sx={{ width: "150px" }}
            />
          

             
              </Grid>
              <Grid xs={10} padding="0px 0px">
                <Typography
                  variant="body2"
                  align="center"
                  paddingTop="30px"
                  paddingBottom="64px"
                  color= "#A4A6AD"
                  fontWeight= "200"
                  fontSize= "14px"
                
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
