import { ProjectShort } from "./project";

export interface CharityMembership {
  id: string;
  userId: string;
  charityId: string;
  charityHead: boolean;
}

export interface CharityPagePayload {
  ukCharityNumber: string;
  charityName: string;
  email: string;
  about?: string;
  projects: ProjectShort[];
}
