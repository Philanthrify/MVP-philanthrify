import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CharityUserTypeObj } from "@/models/Signup";
import { WidthFull } from "@mui/icons-material";
import FormStyles from "./FormsUI";
interface AddTeamMemberModalProps {
  open: boolean;
  onClose: () => void;
}
const validationSchema = yup.object({
  email: yup.string().required("email is required"),
});
const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  open,
  onClose,
}) => {
  const { palette } = useTheme();
  useEffect(() => {
    console.log("🚀 ~ open:", open);
  }, [open]);

  const changePermissions = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    formik.setFieldValue("permissions", value);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    color: palette.white.light,
    bgcolor: palette.background.default,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "1rem",
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      permissions: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const textFieldProps = FormStyles();
  useEffect(() => {
    console.log("Formik values changed:", formik.values);
  }, [formik.values]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item>
            {" "}
            <Typography id="modal-modal-title" variant="h2" component="h2">
              Add a Team Member
            </Typography>
          </Grid>{" "}
          <Grid item>
            {" "}
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: 2 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              elementum fringilla metus, ac hendrerit nunc mattis ut. Etiam orci
              erat, ultrices et tincidunt sit amet, auctor et ligula. Curabitur
              fermentum tincidunt placerat. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Quisque massa justo, egestas eget semper a, interdum vitae mi.
              Suspendisse diam elit, rutrum sit amet iaculis id, feugiat at
              erat. Pellentesque risus urna, semper et neque vitae, suscipit
              cursus ex. Donec sed metus elit.
            </Typography>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
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
                width: "100%",
              }}
            />
            <Grid item>
              <FormHelperText
                error={formik.touched.email && Boolean(formik.errors.email)}
              >
                {formik.touched.email && formik.errors.email}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid item>
            {" "}
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: 2 }}
            >
              Some kind of description of the roles. Witter witter witter.
            </Typography>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {" "}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.permissions}
                label="Role"
                onChange={changePermissions}
              >
                {Object.entries(CharityUserTypeObj).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    <ListItemText primary={value} />{" "}
                    {/* Display the value with spaces */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container item alignItems="center" justifyContent="center">
            {" "}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>{" "}
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddTeamMemberModal;
