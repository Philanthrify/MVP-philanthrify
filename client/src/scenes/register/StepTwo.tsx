import DragAndDrop from "@/components/FormsUI/DragAndDrop";
import TypographyTitle from "@/components/Title";
import { Signup } from "@/models/Signup";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
interface StepTwoProps {
  data: Signup; // signup data store
  updateData: (updatedData: Signup) => void; // updates the parent comp with the new data
  handleNext: (updatedData: Signup) => void;
  handleBack: () => void;
}

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
  const handleFileChange = (file: File | null) => {
    if (file) {
      props.data.image = file;
    } else {
      props.data.image = null;
    }
  };

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
          <Grid item sx={{ width: "80%" }}>
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
          </Grid>
        )}

        {props.data.userType === "CHARITY" && (
          <Grid item sx={{ width: "80%" }}>
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
          </Grid>
        )}
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
      >
        <TypographyTitle
          variant="h3"
          fontSize="18px"
          align="left"
          marginTop="0px"
          paddingBottom="10px"
        >
          Add a logo for your charity
        </TypographyTitle>
        <DragAndDrop onFileChange={handleFileChange} />
      </Grid>
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
