import React, { useEffect, useRef, useState } from "react";

import PageBox from "@/components/PageBox";
import FilterDrawer from "@/components/Search/FilterDrawer";
import SearchResult from "@/components/Search/SearchResults";
import SearchTextField from "@/components/Search/SearchTextField";
import TypographyTitle from "@/components/Title";
import { setPage, setSearchResults } from "@/redux/exploreSlice";
import { RootState } from "@/redux/store";
import { Grid, Pagination, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Explore = () => {
  const isFirstlMount = useRef(true); // check if page has loaded for first time (for managing useEffect filter search)

  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);
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
    _: React.ChangeEvent<unknown>, // intentionally unused
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
  useEffect(() => {
    // Skip the first execution on initial mount
    if (isFirstlMount.current) {
      isFirstlMount.current = false;
    } else {
      // This code runs on subsequent renders, i.e., when filters change
      fetchProjects();
    }
  }, [filters]); // Dependency array includes filters, change as needed
  const fetchProjects = async () => {
    try {
      console.log({ ...filters });
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/project/search`,
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
        marginTop="16px" // Add marginTop here for spacing
      >
        <PageBox backgroundColor="background.light">
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            width="100%"
            height="100%"
            maxWidth="620px"
            display="flex"
            flexDirection="column"

            //sx={{
            //width: "1280px",
            //height: "510px",
            //backgroundColor: "11111", // Replace "your_color_here" with your desired color
            //}}
          >
            <TypographyTitle variant="h1" align="center">
              Explore all our projects
            </TypographyTitle>

            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 300,
                color: "grey.600",
                marginTop: "10px",
                marginBottom: "50px",
              }}
            >
              Find the right project to support and give a transparent donation
            </Typography>

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
          //width="75%"
          width="1216px"
          marginTop="64px"
          marginBottom="64px"

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
                paddingTop: "40px",
                paddingBottom: "64px",
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
