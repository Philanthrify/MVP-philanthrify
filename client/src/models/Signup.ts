export interface Signup {
  userType?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  ukCharityNumber?: number | null; // at this stage it can be null
  charityName?: string;
  charityUserType?: CharityUserType;
  // when onboarding a charity, the root is always CHARITYHEAD
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
