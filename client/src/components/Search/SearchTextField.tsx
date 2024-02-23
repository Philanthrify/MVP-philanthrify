import {
  clearFilterCountry,
  deleteFilterTag,
  setSearchTerm,
} from "@/redux/exploreSlice";
import { RootState } from "@/redux/store"; // Import the type for RootState
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FilterBox from "./FilterBox";
import { useEffect, useState } from "react";
import { isFilterEmpty } from "@/models/searchFilters";

type SearchTextFieldProps = {
  fetchProjects: () => Promise<void>;
  openFilterMenu: () => void;
};

const SearchTextField = (props: SearchTextFieldProps) => {
  const dispatch = useDispatch();
  const [filterEmptiness, setFilterEmptiness] = useState<boolean>(true);
  const searchResults = useSelector(
    (state: RootState) => state.explore.searchResults
  );

  const { palette } = useTheme();
  const filters = useSelector((state: RootState) => state.explore.filters);

  const searchTerm = useSelector(
    (state: RootState) => state.explore.searchTerm
  );
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (searchTerm) {
        props.fetchProjects();
      }
    }
  };
  // upon page load we either have already got a search result or we want to load an initial one
  if (!searchResults) {
    console.log("bringing up default search...");
    props.fetchProjects();
  }

  const removeTag = (tagName: string) => {
    dispatch(deleteFilterTag(tagName));
  };
  // every time the filters change then we check whether they're empty
  // and if so hide filter header
  useEffect(() => {
    const emptiness = isFilterEmpty(filters);
    setFilterEmptiness(emptiness);
    // switch (isFilterEmpty(filters)) {
    //   case true:
    //     setFilterEmptiness(true);
    //     break;
    //   case false:
    //     break;
    // }
    console.log("🚀 ~ SearchTextField ~ filterEmptiness:", filterEmptiness);
  }, [filters]);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ height: "100%", }}
      >
        <Grid item sx={{ width: "100%", }}>
          <TextField
            label=""
            variant="outlined"
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            onKeyDown={handleKeyPress}
            sx={{
              width: "100%", 
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    color: palette.grey[500],
                    marginLeft: "15px",
                    
                    "& .MuiTypography-root": { color: palette.grey[500] },
                  }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* FiltersBox listof */}
        {!filterEmptiness && (
          <Grid
            item
            container
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 300,
                  color: "grey.600",
                }}
              >
                Filters:{" "}
              </Typography>
            </Grid>

            {filters.country && (
              <Grid item>
                <FilterBox
                  text={filters.country}
                  onDelete={() => {
                    dispatch(clearFilterCountry());
                  }}
                />
              </Grid>
            )}
            {filters.listOfTags.map((tag) => {
              return (
                <Grid key={tag} item>
                  <FilterBox
                    text={tag}
                    onDelete={() => {
                      removeTag(tag);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}

        <Grid
          item
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            {" "}
            <Button variant="contained" onClick={props.fetchProjects}>
              Search
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{}} onClick={props.openFilterMenu}>
              <TuneIcon sx={{ color: "black" }} />
              Filters
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchTextField;
