export interface ProjectPageFields {
  title: CurrentFieldValAndEdit;
  backgroundAndGoals: CurrentFieldValAndEdit;
  solution: CurrentFieldValAndEdit;
  donationUsage: CurrentFieldValAndEdit;
  subtitle: CurrentFieldValAndEdit;
}

interface CurrentFieldValAndEdit {
  current: string; // the current value of that field
  edit: boolean; // whether it's being edited right now / aka not yet saved
}
