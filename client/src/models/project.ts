import { Link } from "@/components/FormsUI/LinkInput";
import { Dayjs } from "dayjs";
import { Update } from "./update";

/*
sometimes need partial aspects of project data meaning that I left all fields as optional.
*/
export interface Project {
  id?: string;
  title?: string;
  country?: string;
  challenge?: string;
  solution?: string;
  donationUsage?: string;
  futureImpact?: string;
  link?: Link[];
  tag?: string[];
  targetAmount?: number;
  currentAmount?: number;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  image?: File | null;
  updates?: Update[];
  charityId?: string;
}

// a project list is a list of the users current projects including database references
// it is made up of just the projectId (DB), projectName and allows for setting global project list
// for particular user since this information is needed often
export interface ProjectShort {
  id: string;
  title: string;
}
