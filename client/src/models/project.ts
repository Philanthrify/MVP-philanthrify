import { Link } from "@/components/FormsUI/LinkInput";
import { Dayjs } from "dayjs";
import { Update } from "./update";
import { Transaction } from "./transaction";
import { ProjectMembership } from "./ProjectMembership";

/*
sometimes need partial aspects of project data meaning that I left all fields as optional.
*/
export interface Project {
  id?: string;
  title?: string;
  country: string;
  backgroundAndGoals: string;
  solution: string;
  donationUsage?: string;
  subtitle?: string;
  link: Link[];
  tag: string[];
  targetAmount: number;
  currentAmount?: number; // isn't defined for first making a project
  startDate?: Dayjs | null;
  endDate: Dayjs | null;
  image?: File | null;
  updates?: Update[];
  charityId?: string;
  transactions?: Transaction[];
  membershipBool?: ProjectMembership; // tells us whether this user is a member of this project
}

// a project list is a list of the users current projects including database references
// it is made up of just the projectId (DB), projectName and allows for setting global project list
// for particular user since this information is needed often
export interface ProjectShort {
  id: string;
  title: string;
}

export type UpdateProjectFieldPayload = {
  field: UpdatableStringFieldsOfProject;
  value: string;
};
type UpdatableStringFieldsOfProject =
  | "title"
  | "backgroundAndGoals"
  | "solution"
  | "donationUsage"
  | "subtitle"
  | "charityId";
