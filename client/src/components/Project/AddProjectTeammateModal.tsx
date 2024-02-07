import { User } from "@/models/User";
import { RootState } from "@/redux/store";
import {
  Autocomplete,
  Box,
  Checkbox,
  Grid,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";

interface AddProjectTeammatePayload {
  addUserId: string;
  projectId: string;
  projectLead: boolean;
}

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

const AddProjectTeammateModal: React.FC<AddProjectTeammateModalProps> = ({
  open,
  onClose,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { palette } = useTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const [inviteMatePayload, setInviteMatePayload] =
    useState<AddProjectTeammatePayload>({
      addUserId: "",
      projectId: projectId ? projectId : "",
      projectLead: false,
    });
  const teammates = useSelector((state: RootState) => state.project.teammates);
  const charityTeammates = useSelector(
    (state: RootState) => state.project.charityTeammates
  );
  // those not in project but in charity
  const charityMatesNotInProject: User[] = findCharityTeammatesNotInProject(
    teammates,
    charityTeammates
  );
  const handleToggleProjectLead = () => {
    setInviteMatePayload((prevState: AddProjectTeammatePayload) => ({
      ...prevState,
      projectLead: !prevState.projectLead,
    }));
  };
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

  const onSubmit = () => {
    axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/project-membership`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: JSON.stringify(inviteMatePayload),
      // withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log(inviteMatePayload);
  }, [inviteMatePayload]);

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
              onChange={(_event, value) => {
                if (value) {
                  setInviteMatePayload(
                    (prevState: AddProjectTeammatePayload) => ({
                      ...prevState,
                      addUserId: value.id,
                    })
                  );
                }
              }}
            />
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Grid item>
              <Typography id="modal-modal-description" variant="body1">
                Will this person be a Project Lead?
              </Typography>
            </Grid>
            <Grid item>
              <Checkbox
                checked={inviteMatePayload.projectLead}
                onChange={handleToggleProjectLead}
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent="center">
            <Grid item>
              {" "}
              <PrimaryButton type="submit" text="Submit" onClick={onSubmit} />
            </Grid>
          </Grid>
        </Grid>{" "}
      </Box>
    </Modal>
  );
};

export default AddProjectTeammateModal;
