export interface ProjectPageFields {
  title: CurrentFieldValAndEdit;
  challenge: CurrentFieldValAndEdit;
  solution: CurrentFieldValAndEdit;
  donationUsage: CurrentFieldValAndEdit;
  futureImpact: CurrentFieldValAndEdit;
}

interface CurrentFieldValAndEdit {
  current: string; // the current value of that field
  edit: boolean; // whether it's being edited right now / aka not yet saved
}
