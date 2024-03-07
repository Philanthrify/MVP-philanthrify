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
  tags: CharityTag[] | string[];
  countriesActive: CharityCountriesActive[] | string[];
  requesterCharityHead: boolean; // tells us whether they have rights to edit the charity page and see the charity members

  // following optional fields aren't intaken at the time of onboarding and therefore will be null upon first load of charity page

  reachOutEmail: string | null;
  foundedDate: Dayjs | null;
  membershipConfirmed: boolean | null;
  membershipConfirmedDateTime: Dayjs | null;
  weblink: string | null;
  tagline?: string;
  about?: string;
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

export type CharityTag = {
  id: string;
  charityId: string;
  value: string;
};

// Custom type guard to check if a tag is a CharityTag
export function isCharityTag(tag: CharityTag | string): tag is CharityTag {
  return (tag as CharityTag).value !== undefined;
}

export type CharityCountriesActive = {
  id: string;
  charityId: string;
  value: string;
};
// Custom type guard to check if a tag is a CharityCountriesActive
export function isCharityCountriesActive(
  country: CharityCountriesActive | string
): country is CharityCountriesActive {
  return (country as CharityCountriesActive).value !== undefined;
}

export type CharityPageUpdatePayload = {
  tags: string[];
  countriesActive: string[];
  foundedDate: Dayjs | null;
  weblink: string;
  reachOutEmail: string;
};
