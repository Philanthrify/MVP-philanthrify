export interface Signup {
  userType?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  ukCharityNumber?: string | null; // at this stage it can be null
  charityName?: string;
  charityHead?: boolean;
  // when onboarding a new charity, the root is always CHARITYHEAD
  charityId?: string;
  token?: string;
  image?: File | null;
}

export enum CharityUserType {
  CHARITYHEAD = "CHARITYHEAD",
  PROJECTLEAD = "PROJECTLEAD",
  PROJECTWORKER = "PROJECTWORKER",
}
export const CharityUserTypeObj = {
  CHARITYHEAD: "Charity Head",
  PROJECTLEAD: "Project Lead",
  PROJECTWORKER: "Project Reporter",
};
