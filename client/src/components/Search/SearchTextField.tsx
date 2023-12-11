import {
  Button,
  Drawer,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import FormStyles from "../FormsUI";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import FilterDrawer from "./FilterDrawer";

type SearchTextFieldProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchTextField = (props: SearchTextFieldProps) => {
  const textFieldProps = FormStyles();
  const { palette } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = () => {
    props.onSearch(searchTerm);
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const openFilterMenu = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <FilterDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={openFilterMenu}
            >
              <TuneIcon />
              Filters
            </Button>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </>
  );
};

export default SearchTextField;
