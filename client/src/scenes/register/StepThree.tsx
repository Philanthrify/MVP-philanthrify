import { Signup } from "@/models/Signup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "@/contexts/snackbarContext";
import { selectToken } from "@/redux/authSlice";

import * as yup from "yup";
type StepThreeProps = {
  data: Signup; // signup data store
  updateData: (updatedData: Signup) => void; // updates the parent comp with the new data
  onSubmit: (updatedData: Signup) => void;
  handleBack: () => void;
};

const validationSchema = yup.object({
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

const StepThree = (props: StepThreeProps) => {
  // console.log("🚀 ~ file: StepThree.tsx:47 ~ StepThree ~ props:", props);
  const navigate = useNavigate();
  const { openAlertSnackbar } = useSnackbar();
  const formData = new FormData();


  const formik = useFormik({
    initialValues: props.data,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("next page");
      props.onSubmit(values);
      if (props.data.image) {

        const URL_to_use = props.data.userType == "CHARITY" ? `/charity/upload-charity-avatar` : `/donor/upload-donor-avatar`; //TODO: implement donor API
        const { image, ...dataWithoutImage } = props.data;
        formData.append("image", image);

        axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}${URL_to_use}}`,
        params: { charityId: props.data.charityId },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then(() => {
          console.log("Image upload successful");
          openAlertSnackbar("Image uploaded successfully", "success");
        })
        .catch((uploadError) => {
          console.log(uploadError);
          openAlertSnackbar("Image not uploaded", "error");
        });}
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // This prevents the focus event from triggering
    setShowPassword(true);
  };

  const handleMouseUpPassword = () => {
    setShowPassword(false);
  };

  const handleMouseDownConfirmPassword = (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault(); // This prevents the focus event from triggering
    setShowConfirmPassword(true);
  };

  const handleMouseUpConfirmPassword = () => {
    setShowConfirmPassword(false);
  };
  // as values are changed the parent value is changed accordingly
  useEffect(() => {
    props.updateData(formik.values);
  }, [formik.values, props]);
  return (
    <Grid item sx={{ width: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            {/* <Grid
              item
              container
              direction="column"
              xs={6}
              justifyContent="center"
              alignItems="flex-end"
            > */}
            <Grid item>
              <TextField
                id="firstname"
                name="firstname"
                label="Firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={""}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item>
              <Grid item>
                <FormHelperText
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                ></FormHelperText>{" "}
              </Grid>{" "}
            </Grid>
            {/* </Grid> */}
            {/* <Grid item xs={6} justifyContent="center" alignItems="flex-end"> */}{" "}
            <Grid item>
              <TextField
                id="lastname"
                name="lastname"
                label="Lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={""}
                sx={{ width: "100%" }}
              />{" "}
            </Grid>
            {/* <Grid item>
                <FormHelperText
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                ></FormHelperText>{" "}
              </Grid>{" "} */}
            {/* </Grid> */}
          </Grid>
          {!formik.values.token && (
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ width: "80%" }}
            >
              {" "}
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
                sx={{ width: "80%" }}
              />
              <Grid xs={10}>
                <FormHelperText
                  error={formik.touched.email && Boolean(formik.errors.email)}
                >
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </Grid>
            </Grid>
          )}
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "80%" }}
          >
            {" "}
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={""}
              sx={{ width: "80%" }}
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
                      <VisibilityIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                  </>
                ),
              }}
            />{" "}
            <Grid xs={10}>
              <FormHelperText
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "80%" }}
          >
            {" "}
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
              sx={{ width: "80%" }}
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
                    size="small"
                  >
                    <VisibilityIcon sx={{ color: "primary.main" }} />
                  </IconButton>
                ),
              }}
            />
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
          </Grid>

          <Grid
            container
            item
            direction="row"
            justifyContent="center"
            spacing={3}
          >
            <Grid item>
              {" "}
              <Button
                color="primary"
                variant="contained"
                onClick={props.handleBack}
                sx={{ width: "100px" }}
              >
                Back
              </Button>
            </Grid>

            <Grid item>
              {" "}
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ width: "100px" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
export default StepThree;