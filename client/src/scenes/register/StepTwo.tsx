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
      console.log("leaving step2");
      props.handleNext(values);
    },
  });

  // useEffect(() => {
  //   console.log("Changed (FORMIK):", formik.values);
  // }, [formik.values]);
  useEffect(() => {
    props.updateData(formik.values);
  }, [formik.values, props]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
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

        {props.data.userType === "CHARITY" && (
          <>
            <TextField
              fullWidth
              id="ukCharityNumber"
              name="ukCharityNumber"
              label="Charity Registration Number (UK)"
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
