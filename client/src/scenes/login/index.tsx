import PrimaryButton from "@/components/Button/PrimaryButton";
import FormBox from "@/components/FormBox";
import ErrorComponent from "@/components/FormError";
import FormStyles from "@/components/FormsUI";
import OwnLink from "@/components/OwnLink";
import TypographyTitle from "@/components/Title";
import { CharityMembership, CharityPagePayload } from "@/models/charity";
import { login } from "@/redux/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import * as yup from "yup";

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
  loggedInCharity?: CharityPagePayload;
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
          {" "}
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <TypographyTitle variant="h1" paddingTop="64px">
                Log in
              </TypographyTitle>
            </Grid>
            <Grid item>
              {" "}
              <TypographyTitle variant="body2" align="center" color="#A4A6AD">
                Welcome back to our community
              </TypographyTitle>
            </Grid>
            {loginError && (
              <Grid item>
                {" "}
                <ErrorComponent message={loginError} />
              </Grid>
            )}

            <Grid item sx={{ width: "100%" }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  item
                  container
                  spacing={0.5}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Grid item sx={{ width: "50%" }}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item sx={{ width: "50%" }}>
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
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      sx={{
                        //...textFieldProps.textField,
                        //width: textFieldProps.textFieldWidth,
                        width: "100%", // Set the width to 100%
                        // maxWidth: "320px", // Set the maximum width
                        marginTop: "30px",
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
                              <VisibilityOffIcon
                                sx={{ color: "primary.main" }}
                              />
                            ) : (
                              <VisibilityIcon sx={{ color: "primary.main" }} />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>

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
                </Grid>
              </form>{" "}
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              paddingTop="30px"
              paddingBottom="64px"
            >
              <Grid item>
                {" "}
                <Typography variant="body2" fontWeight="200" fontSize="14px">
                  Don't have an account yet?{" "}
                </Typography>
              </Grid>{" "}
              <Grid item>
                <OwnLink
                  text="Register"
                  weblink="/register"
                  openInNew={false} // Assuming you do not need it to open in a new tab
                  linkColour="primary[100]"
                />
              </Grid>
            </Grid>
          </Grid>
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default Login;
