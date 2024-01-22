import { setFilters } from "@/redux/exploreSlice";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountrySelect from "../FormsUI/CountrySelector";
import TagSelector from "../FormsUI/TagSelector";
import TypographySmallText from "../SmallText";
import TypographyTitle from "../Title";

type FilterDrawerProps = {
  drawerOpen: boolean;
  setDrawerOpen: (arg0: boolean) => void;
  fetchProjects: () => Promise<void>; // for searching
};

const FilterDrawer = (props: FilterDrawerProps) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.explore.filters);
  const handleCountryChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    dispatch(setFilters({ ...filters, country: newValue }));
  };
  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const valueArray = typeof value === "string" ? [value] : value;

    dispatch(setFilters({ ...filters, listOfTags: valueArray }));
  };
  const clearFilters = () => {
    dispatch(setFilters({ country: "", listOfTags: [] }));
  };
  useEffect(() => {
    console.log("Filters in Redux Store:", filters);
  }, [filters]);
  return (
    <Drawer
      anchor="left"
      open={props.drawerOpen}
      onClose={() => props.setDrawerOpen(false)}
    >
      <Box
        p={2}
        width="400px"
        textAlign="center"
        role="presentation"
        sx={{
          backgroundColor: "#2C2C2E", // This is the color of the background in the photo
          height: "100%",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          maxWidth="100%"
        >
          <Grid item xs={12} maxWidth="100%">
            <TypographyTitle variant="h3" align="center" padding="15px 0">
              Filters
            </TypographyTitle>
            <Divider sx={{ borderColor: palette.white.middle, marginY: 2 }} />
            <TypographyTitle variant="h4" align="center" padding="15px 0">
              Country
            </TypographyTitle>
            <TypographySmallText variant="h6" align="center" padding="15px 0">
              Select any country worldwide.
            </TypographySmallText>
            <CountrySelect
              value={filters.country}
              onChange={handleCountryChange}
            />
            <Divider sx={{ borderColor: palette.white.middle, marginY: 2 }} />
            <TypographyTitle variant="h4" align="center" padding="15px 0">
              Categories
            </TypographyTitle>
            <TypographySmallText variant="h6" align="center" padding="15px 0">
              What kind of project are you looking for?
            </TypographySmallText>
            <TagSelector
              value={filters.listOfTags}
              handleChange={handleTagChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={props.fetchProjects}>Search</Button>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
