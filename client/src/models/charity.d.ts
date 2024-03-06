import { Dayjs } from "dayjs";
import { ProjectShort } from "./project";
import { CurrentFieldValAndEdit } from "@/models/WidespreadModels";

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

  projects: ProjectShort[];
  tags: CharityTag[];
  countriesActive: CharityCountriesActive[];
  requesterCharityHead: boolean; // tells us whether they have rights to edit the charity page and see the charity members

  // following optional fields aren't intaken at the time of onboarding and therefore will be null upon first load of charity page
  about?: string;
  reachOutEmail?: string;
  foundedDate?: Dayjs;
  membershipConfirmed?: boolean;
  membershipConfirmedDateTime?: Dayjs;
  tagline?: string;
}

// editable fields on charity page
export interface CharityPageFields {
  tagline: CurrentFieldValAndEdit;
  about: CurrentFieldValAndEdit;
}

export type UpdateCharityFieldPayload = {
  field: UpdatableStringFieldsOfCharity;
  value: string;
};
type UpdatableStringFieldsOfCharity = "about" | "reachOutEmail" | "tagline";

type CharityTag = {
  id: string;
  charityId: string;
  value: string;
};

type CharityCountriesActive = {
  id: string;
  charityId: string;
  value: string;
};

type CharityPageUpdatePayload = {
  tags: string[];
  countriesActive: string[];
};
