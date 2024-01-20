export const TransactionKinds = {
  Administrative: "Administrative Costs",
  Salary: "Salary Costs",
  Development: "Development Costs",
  Travel: "Travel Costs",
  Marketing: "Marketing Costs",
  Licensing: "Licensing Costs",
  Subcontractor: "Subcontractor Costs",
};

export interface Transaction {
  id: string;
  type: string;
  whatFor: string;
  whatBrought: string;
  amount: string;
  posterId: string;
  projectId: string;
};