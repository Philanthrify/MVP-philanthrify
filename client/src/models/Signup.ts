export interface Signup {
  userType?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  ukCharityNumber?: number | null; // at this stage it can be null
  charityName?: string;
}
