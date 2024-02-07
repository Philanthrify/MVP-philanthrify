import { selectToken } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  Checkbox,
  //FormHelperText,
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
  email: yup.string().required("Email is required"),
});

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  open,
  onClose,
}) => {
  const token = useSelector(selectToken);
  const charity = useSelector((state: RootState) => state.auth.charity);
  const teammates = useSelector((state: RootState) => state.project.teammates);
  console.log("🚀 ~ teammates:", teammates);
  const { palette } = useTheme();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    color: palette.white.light,
    bgcolor: palette.background.default,
    border: "0px solid #000",
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
    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/team-invite`,
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
              <Typography variant="h2" component="h2">
                Add a Team Member
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Enter the email of the person you wish to invite to your charity
                team. Then pick whether they will be given 'Charity Head' access
                rights. This means that they can edit, add transactions for all
                projects across the charity. If this user is just intended for
                working on a single project within the charity then we suggest
                to not give these access rights and add them just to that
                project.
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
                helperText={formik.touched.email && formik.errors.email}
                sx={{ ...textFieldProps.textField, width: "100%" }}
              />
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="body1">
                    Add this user to 'Charity Head' access rights group?
                  </Typography>
                </Grid>
                <Grid item>
                  <Checkbox
                    checked={formik.values.charityHead}
                    onChange={() =>
                      formik.setFieldValue(
                        "charityHead",
                        !formik.values.charityHead
                      )
                    }
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{ color: "white" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item alignItems="center" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTeamMemberModal;
