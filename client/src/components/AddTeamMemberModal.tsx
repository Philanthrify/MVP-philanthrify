import { selectToken } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
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
  const token = useSelector(selectToken);
  const charity = useSelector((state: RootState) => state.auth.charity);

  const { palette } = useTheme();
  useEffect(() => {
    console.log("🚀 ~ open:", open);
  }, [open]);

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
      charityId: charity?.ukCharityNumber,
      email: "",
      charityHead: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      axios({
        method: "post",
        url: "http://localhost:1337/team-invite",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: JSON.stringify(values),
        // withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          onClose();
        })
        .catch((error) => {
          console.log(error);
        });
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
        <form onSubmit={formik.handleSubmit}>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas elementum fringilla metus, ac hendrerit nunc mattis ut.
                Etiam orci erat, ultrices et tincidunt sit amet, auctor et
                ligula. Curabitur fermentum tincidunt placerat. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Quisque massa justo, egestas eget semper a,
                interdum vitae mi. Suspendisse diam elit, rutrum sit amet
                iaculis id, feugiat at erat. Pellentesque risus urna, semper et
                neque vitae, suscipit cursus ex. Donec sed metus elit.
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
              <Checkbox
                checked={formik.values.charityHead}
                onChange={() =>
                  formik.setFieldValue(
                    "charityHead",
                    !formik.values.charityHead
                  )
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
            <Grid container item alignItems="center" justifyContent="center">
              {" "}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>{" "}
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTeamMemberModal;
