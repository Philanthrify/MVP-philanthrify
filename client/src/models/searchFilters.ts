// a type for all the filters which will be in the MVP:

// country
// tags
export interface SearchFilters {
  country: string;
  listOfTags: string[];
}

// Checks whether there are any filters applied at this time
// return Bool
export const isFilterEmpty = (searchFilters: SearchFilters): boolean => {
  console.log("🚀 ~ isFilterEmpty ~ searchFilters:", searchFilters);

  if (searchFilters.country) {
    console.log(
      "🚀 ~ isFilterEmpty ~ searchFilters.country:",
      searchFilters.country
    );
    return false;
  }
  if (searchFilters.listOfTags.length !== 0) {
    console.log(
      "🚀 ~ isFilterEmpty ~ searchFilters.listOfTags:",
      searchFilters.listOfTags
    );
    return false;
  }
  return true;
};
