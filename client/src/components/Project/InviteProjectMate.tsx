import { RootState } from "@/redux/store";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  projectLead?: boolean;
}
interface CharityMember {
  userType: string;
  user: User; // Assuming 'User' is your existing interface
}

interface InviteProjectMateProps {
  ukCharityNumber: string;
}
// takes the charity number and works out who's on this team currently
const InviteProjectMate: React.FC<InviteProjectMateProps> = ({
  ukCharityNumber,
}) => {
  const project = useSelector((state: RootState) => state.project.project);
  const { projectId } = useParams<{ projectId: string }>();
  const [teamMates, setTeamMates] = useState<User[]>([]);
  const [charityMates, setCharityMates] = useState<User[]>([]); // a func which finds the project members

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
    } catch (error: any) {
      console.error("Failed to load team mates:", error.message);
    }
  };
  // TODO: currently is loading excess Matesrmation
  const loadCharityTeam = async () => {
    try {
      const response = await axios.get<{ members: CharityMember[] }>(
        `${import.meta.env.VITE_API_URL}/charity/${ukCharityNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const transformedMemberships = response.data.members.map((member) => ({
        id: member.user.id,
        firstname: member.user.firstname,
        lastname: member.user.lastname,
        email: member.user.email,
      }));

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
      <Typography variant="body2">Project Team Members:</Typography>
      <ul>
        {teamMates.map((mate) => (
          <li key={mate.id}>
            {mate.firstname} {mate.lastname} - {mate.email} -{" "}
            {mate.projectLead && "Project Lead"}
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
      </ul>
    </>
  );
};

export default InviteProjectMate;
