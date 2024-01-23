import { setSearchTerm } from "@/redux/exploreSlice";
import { RootState } from "@/redux/store"; // Import the type for RootState
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormStyles from "../FormsUI";

type SearchTextFieldProps = {
  fetchProjects: () => Promise<void>;
  openFilterMenu: () => void;
};

const SearchTextField = (props: SearchTextFieldProps) => {
  const dispatch = useDispatch();

  const textFieldProps = FormStyles();

  const { palette } = useTheme();

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("searching!");
      props.fetchProjects();
    }
  };

  const searchTerm = useSelector(
    (state: RootState) => state.explore.searchTerm
  );

  useEffect(() => {
    console.log("searchTerm in Redux Store:", searchTerm);
  }, [searchTerm]);
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            xs={8}
            sx={{
              height: "100%",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              onKeyDown={handleKeyPress}
              sx={{
                ...textFieldProps.textField,
                width: "100%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      color: palette.grey[500],
                      "& .MuiTypography-root": { color: palette.grey[500] },
                    }}
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            xs={3}
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" sx={{}} onClick={props.openFilterMenu}>
              <TuneIcon />
              Filters
            </Button>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={props.fetchProjects}>
          Search
        </Button>
      </Grid>
    </>
  );
};

export default SearchTextField;
