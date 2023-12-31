import AmountInput from "@/components/FormsUI/AmountInput";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  useTheme,
} from "@mui/material";
import FormStyles from "@/components/FormsUI";
import { useEffect, useState } from "react";
import { Signup } from "@/models/Signup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
type StepTwoProps = {
  data: Signup; // signup data store
  updateData: (updatedData: Signup) => void; // updates the parent comp with the new data
  handleNext: (updatedData: Signup) => void;
  handleBack: () => void;
};

// TODO: check charity number
const validationSchemaCharity = yup.object({
  charityName: yup
    .string()
    .min(2, "Charity name should be of minimum 3 characters length")
    .max(30, "Charity name should not exceed 30 characters")
    .required("Charity name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

// TODO: check charity number
const validationSchemaDonor = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const StepTwo = (props: StepTwoProps) => {
  // console.log("🚀 ~ file: StepTwo.tsx:47 ~ StepTwo ~ props:", props);
  const textFieldProps = FormStyles();
  const { palette } = useTheme();
  const formik = useFormik({
    initialValues: props.data,
    validationSchema:
      props.data.userType === "CHARITY"
        ? validationSchemaCharity
        : validationSchemaDonor,
    onSubmit: (values) => {
      console.log("next page");
      props.handleNext(values);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    console.log("Changed (FORMIK):", formik.values);
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={""}
          sx={{
            ...textFieldProps.textField,
            width: textFieldProps.textFieldWidth,
          }}
        />
        <Grid xs={10}>
          <FormHelperText
            error={formik.touched.username && Boolean(formik.errors.username)}
          ></FormHelperText>{" "}
        </Grid>{" "}
        {props.data.userType === "CHARITY" && (
          <>
            <TextField
              fullWidth
              id="charityName"
              name="charityName"
              label="Charity Name"
              value={formik.values.charityName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.charityName && Boolean(formik.errors.charityName)
              }
              helperText={""}
              sx={{
                ...textFieldProps.textField,
                width: textFieldProps.textFieldWidth,
              }}
            />
            <Grid xs={10}>
              <FormHelperText
                error={
                  formik.touched.charityName &&
                  Boolean(formik.errors.charityName)
                }
              >
                {formik.touched.charityName && formik.errors.charityName}
              </FormHelperText>
            </Grid>
          </>
        )}
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
          sx={{
            ...textFieldProps.textField,
            width: textFieldProps.textFieldWidth,
          }}
        />
        <Grid xs={10}>
          <FormHelperText
            error={formik.touched.email && Boolean(formik.errors.email)}
          >
            {formik.touched.email && formik.errors.email}
          </FormHelperText>
        </Grid>
        {props.data.userType === "CHARITY" && (
          <>
            <TextField
              fullWidth
              id="ukCharityNumber"
              name="ukCharityNumber"
              label="UK Charity Number"
              value={formik.values.ukCharityNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.ukCharityNumber &&
                Boolean(formik.errors.ukCharityNumber)
              }
              helperText={""}
              sx={{
                ...textFieldProps.textField,
                width: textFieldProps.textFieldWidth,
              }}
            />
            <Grid xs={10}>
              <FormHelperText
                error={
                  formik.touched.ukCharityNumber &&
                  Boolean(formik.errors.ukCharityNumber)
                }
              >
                {formik.touched.ukCharityNumber &&
                  formik.errors.ukCharityNumber}
              </FormHelperText>
            </Grid>
          </>
        )}
        <Grid container item direction="row" justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ width: "100px" }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default StepTwo;
