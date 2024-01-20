export interface CharityMembership {
  id: string;
  userId: string;
  charityId: string;
  charityHead: boolean;
}

export interface Charity {
  ukCharityNumber: string;
  charityName: string;
  email: string;
}
