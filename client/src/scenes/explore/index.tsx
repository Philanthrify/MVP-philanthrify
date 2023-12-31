import React, { useEffect, useState } from "react";

import axios from "axios";
import SearchTextField from "@/components/Search/SearchTextField";
import { Grid, Pagination, Typography, useTheme } from "@mui/material";
import TypographyTitle from "@/components/Title";
import SearchResult from "@/components/Search/SearchResults";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Project } from "@/models/project";
import PageBox from "@/components/PageBox";
import { SearchFilters } from "@/models/searchFilters";
import { setSearchResults, setPage } from "@/redux/exploreSlice";
import FilterDrawer from "@/components/Search/FilterDrawer";

const Explore = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const itemsPerPage = 15;
  const pageNum = useSelector((state: RootState) => state.explore.page);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const searchResults = useSelector(
    (state: RootState) => state.explore.searchResults
  );
  // const token = useSelector((state: RootState) => state.auth.token);
  const openFilterMenu = () => {
    setDrawerOpen(!drawerOpen);
  };

  //
  let totalPages;
  if (searchResults) {
    totalPages = Math.ceil(searchResults.length / itemsPerPage);
  }

  const searchTerm = useSelector(
    (state: RootState) => state.explore.searchTerm
  );
  const filters = useSelector((state: RootState) => state.explore.filters);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    dispatch(setPage(page));
  };
  useEffect(() => {
    console.log(
      "🚀 ~ file: index.tsx:44 ~ Explore ~ searchResults:",
      searchResults
    );
  }, [searchResults]);
  const fetchProjects = async () => {
    try {
      console.log({ ...filters });
      axios({
        method: "post",
        url: "http://localhost:1337/project/search",
        headers: {
          "Content-Type": "application/json",
        },
        params: { search: searchTerm },
        data: { ...filters },
        // withCredentials: true,
      }).then((response) => {
        dispatch(setPage(1));
        dispatch(setSearchResults(response.data));
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <>
      {" "}
      <FilterDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        fetchProjects={fetchProjects}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <PageBox>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <TypographyTitle variant="h1" align="center" padding="15px 0">
              Explore away!
            </TypographyTitle>
            <SearchTextField
              fetchProjects={fetchProjects}
              openFilterMenu={openFilterMenu}
            />
          </Grid>{" "}
        </PageBox>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="75%"
          // height="100%" -- warning this was causing unreal bugs XD, the search
          // results were taking up the rest of the page and overflowing onto everythingafter!
        >
          <SearchResult />{" "}
          {/* if no search yet then display nothing, if search but no results display text 
        if successful search then display results */}
          {searchResults === null ? (
            <></>
          ) : searchResults.length === 0 ? (
            <Typography align="center">No results found</Typography>
          ) : (
            <Pagination
              count={totalPages}
              page={pageNum}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{
                paddingBottom: "30px",
                "& .MuiPaginationItem-root": {
                  color: palette.grey[500], // This targets the text color
                  borderColor: palette.grey[500], // This targets the border color
                },
              }}
            />
          )}
        </Grid>{" "}
      </Grid>
    </>
  );
};

export default Explore;
