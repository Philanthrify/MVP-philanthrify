import { Link } from "@/components/FormsUI/LinkInput";
import { Dayjs } from "dayjs";

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
  links?: Link[];
  tag?: string[];
  targetAmount?: number;
  currentAmount?: number;
  endDate?: Dayjs | null;
  image?: File | null;
}
