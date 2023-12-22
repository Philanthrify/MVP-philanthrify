import { Link } from "@/components/FormsUI/LinkInput";

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
  image?: File | null;
}
