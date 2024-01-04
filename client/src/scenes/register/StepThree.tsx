import AmountInput from "@/components/FormsUI/AmountInput";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import FormStyles from "@/components/FormsUI";
import { useEffect, useState } from "react";
import { Signup } from "@/models/Signup";
import VisibilityIcon from "@mui/icons-material/Visibility";
type StepThreeProps = {
  data: Signup; // signup data store
  updateData: (updatedData: Signup) => void; // updates the parent comp with the new data
  onSubmit: (updatedData: Signup) => void;
  handleBack: () => void;
};

const validationSchema = yup.object({
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
  const textFieldProps = FormStyles();
  const formik = useFormik({
    initialValues: props.data,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("next page");
      props.onSubmit(values);
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
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={""}
          sx={{
            ...textFieldProps.textField,
            width: textFieldProps.textFieldWidth,
          }}
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
              </>
            ),
          }}
        />
        <Grid xs={10}>
          <FormHelperText
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </Grid>
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
                onMouseDown={handleMouseDownConfirmPassword}
                onMouseUp={handleMouseUpConfirmPassword}
                onTouchStart={handleMouseDownConfirmPassword}
                onTouchEnd={handleMouseUpConfirmPassword}
                size="small"
              >
                <VisibilityIcon />
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
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </FormHelperText>
        </Grid>
        <Grid container item direction="row" justifyContent="center">
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
    </form>
  );
};
export default StepThree;
