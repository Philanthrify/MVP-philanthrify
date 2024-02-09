// a user model for projects - currently being used for
// listing the users who are project members or charity members

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  projectLead?: boolean;
}

export interface CharityMember {
  userType: string;
  user: User; // Assuming 'User' is your existing interface
}
