export interface CurrentFieldValAndEdit {
  current: string; // the current value of that field
  edit: boolean; // whether it's being edited right now / aka not yet saved
}

// for select components where as the values are being selected, the string in the bar can be updated
export function mapValues(values: string[]): string[] {
  return values.map((key) => (isTagValueKey(key) ? TagValuesObj[key] : key));
}
