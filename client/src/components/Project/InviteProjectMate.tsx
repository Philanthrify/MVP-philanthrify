import { CharityMember, User } from "@/models/User";
import { setCharityTeammates, setTeammates } from "@/redux/projectSlice";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";
import AddProjectTeammateModal from "./AddProjectTeammateModal";
import SectionHeader from "./SectionHeader";

interface InviteProjectMateProps {
  ukCharityNumber: string;
}
// takes the charity number and works out who's on this team currently
const InviteProjectMate: React.FC<InviteProjectMateProps> = ({
  ukCharityNumber,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const { projectId } = useParams<{ projectId: string }>();
  const [teamMates, setTeamMates] = useState<User[]>([]);
  const [charityMates, setCharityMates] = useState<User[]>([]); // a func which finds the project members
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  // getting a list of said project team
  const loadTeamMates = async () => {
    try {
      const response = await axios.get<User[]>(
        `${import.meta.env.VITE_API_URL}/project-membership/${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTeamMates(response.data);
      dispatch(setTeammates(response.data));
    } catch (error: any) {
      console.error("Failed to load team mates:", error.message);
    }
  };
  // TODO: currently is loading excess information
  // getting a list of charity team
  const loadCharityTeam = async () => {
    try {
      const response = await axios.get<{ members: CharityMember[] }>(
        `${import.meta.env.VITE_API_URL}/charity/${ukCharityNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { members: true }, //only getting the members of the charity
        }
      );
      const transformedMemberships = response.data.members.map((member) => ({
        id: member.user.id,
        firstname: member.user.firstname,
        lastname: member.user.lastname,
        email: member.user.email,
      }));
      dispatch(setCharityTeammates(transformedMemberships));

      console.log("Transformed Memberships:", transformedMemberships);
      setCharityMates(transformedMemberships);
    } catch (error: any) {
      console.error("Failed to load charity team:", error.message);
    }
  };

  useEffect(() => {
    loadTeamMates();
    loadCharityTeam();
  }, [projectId]);
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ teamMates:", teamMates);
  }, [teamMates]);
  return (
    <>
      <AddProjectTeammateModal open={isModalOpen} onClose={handleCloseModal} />
      <Grid item container direction="row" sx={{ width: "100%" }}>
        <Grid item container direction="row" sx={{ width: "100%" }}>
          <SectionHeader
            header="Project Team"
            buttons={[
              <PrimaryButton
                text="Edit team members"
                onClick={handleOpenModal}
                sx={{}}
              />,
            ]}
          />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          {" "}
          <Typography variant="body2">Project Team Members:</Typography>
          <ul>
            {teamMates.map((mate) => (
              <li key={mate.id}>
                {mate.firstname} {mate.lastname} - {mate.email} -{" "}
                {mate.projectLead ? "Project Lead" : "Project Reporter"}
              </li>
            ))}
          </ul>
          <Typography variant="body2">Charity Team Members:</Typography>
          <ul>
            {charityMates.map((mate) => (
              <li key={mate.id}>
                {mate.firstname} {mate.lastname}
              </li>
            ))}
          </ul>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default InviteProjectMate;
