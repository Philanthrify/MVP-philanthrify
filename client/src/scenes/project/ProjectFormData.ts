import { Link } from "@/components/LinkInput";

export interface ProjectFormData {
  title: string;
  challenge: string;
  solution: string;
  donationUsage: string;
  futureImpact: string;
  links: Link[];
  listOfTags: string[];
  targetAmount: number;
  image?: File | null;
}
