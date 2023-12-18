import {
  Button,
  Drawer,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormStyles from "../FormsUI";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import FilterDrawer from "./FilterDrawer";
import { SearchFilters } from "@/models/searchFilters";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "@/redux/exploreSlice";
import { RootState } from "@/redux/store"; // Import the type for RootState

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
  const openFilterMenu = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
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
            <Button
              variant="contained"
              sx={{ height: "100%", width: "90%" }}
              onClick={props.openFilterMenu}
            >
              <TuneIcon />
              Filters
            </Button>
          </Grid>
        </Grid>
        <Button variant="contained">Search</Button>
      </Grid>
    </>
  );
};

export default SearchTextField;
