import { Link } from "@/components/FormsUI/LinkInput";
import { Dayjs } from "dayjs";

export interface Project {
  charityId: string;
  id?: string | null;
  title: string;
  challenge: string;
  country: string;
  solution: string;
  tag: string[];
  donationUsage: string;
  futureImpact: string;
  link: Link[];
  targetAmount: number;
  image?: File | null;
  endDate: Dayjs | null;
}
