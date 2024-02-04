import { User } from "@/models/User";
import { RootState } from "@/redux/store";
import {
  Autocomplete,
  Box,
  Grid,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";

interface AddProjectTeammateModalProps {
  open: boolean;
  onClose: () => void;
}
// a function which takes the users in the charity and those in the project
// and finds those who hitherto aren't members of the project
const findCharityTeammatesNotInProject = function (
  projectTeamMates: User[],
  charityTeamMates: User[]
): User[] {
  const projectTeamMateIds = new Set(projectTeamMates.map((user) => user.id));
  console.log(projectTeamMateIds);
  return charityTeamMates.filter(
    (charityTeamMate) => !projectTeamMateIds.has(charityTeamMate.id)
  );
};

const validationSchema = yup.object({});
const AddProjectTeammateModal: React.FC<AddProjectTeammateModalProps> = ({
  open,
  onClose,
}) => {
  const { palette } = useTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const teammates = useSelector((state: RootState) => state.project.teammates);
  const charityTeammates = useSelector(
    (state: RootState) => state.project.charityTeammates
  );
  // those not in project but in charity
  const charityMatesNotInProject: User[] = findCharityTeammatesNotInProject(
    teammates,
    charityTeammates
  );
  console.log("charityTeammates: ", charityMatesNotInProject);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: "auto",
    maxHeight: "80%",
    color: palette.white.light,
    bgcolor: palette.background.default,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "1rem",
    overflowY: "auto",
  };
  const formik = useFormik({
    initialValues: {
      addUserId: "",
      projectId: projectId,
      projectLead: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/project-membership`,
        headers: {
          "Content-Type": "application/json",
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
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ top: "30px", overflow: "scroll" }}
    >
      <Box sx={style}>
        <Grid container direction="column" spacing={2}>
          {" "}
          <Grid item>
            <Typography id="modal-modal-title" variant="h2" component="h2">
              Add a Team Member
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: 2 }}
            >
              Some information about the onboarding teammates to a project. Can
              be as long as you like!!! Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Typography>
          </Grid>
          <Grid item>
            <Autocomplete
              id="teamMateInvite"
              disableClearable
              options={charityMatesNotInProject} // Pass the whole user object as options
              getOptionLabel={(option) =>
                `${option.firstname} ${option.lastname} - ${option.email}`
              } // Display name and email
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.firstname} {option.lastname} - {option.email}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Find teammate..."
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
              onChange={(event, value) => {
                // Handle selection. 'value' will be the user object if not in freeSolo mode
                // In freeSolo mode, you might want to handle it differently
                console.log("Selected user ID:", value?.id); // Assuming you want to do something with the selected user's ID
              }}
            />
          </Grid>
        </Grid>{" "}
      </Box>
    </Modal>
  );
};

export default AddProjectTeammateModal;
