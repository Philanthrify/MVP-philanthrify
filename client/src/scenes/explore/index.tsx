import React, { useState } from "react";

import axios from "axios";
import SearchTextField from "@/components/Search/SearchTextField";
import { Grid, Pagination, useTheme } from "@mui/material";
import Page from "@/components/Page";
import TypographyTitle from "@/components/Title";
import SearchResult from "@/components/Search/SearchResults";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Project } from "@/models/project";
import DashboardBox from "@/components/DashboardBox";
import PageBox from "@/components/PageBox";

const Explore = () => {
  const { palette } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const itemsPerPage = 15; // clone code
  const [searched, setSearched] = useState<Boolean>(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setCurrentPage(page);
  };

  const fetchProjects = async (searchTerm: string) => {
    try {
      console.log(searchTerm);
      axios({
        method: "get",
        url: "http://localhost:1337/project",
        headers: {
          "Content-Type": "application/json",
        },
        params: { search: searchTerm },
        // data: ,
        // withCredentials: true,
      }).then((response) => {
        setSearched(true);
        setCurrentPage(1);
        setProjects(response.data);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
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
          <SearchTextField onSearch={fetchProjects} />
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
        <SearchResult projects={projects} currentPage={currentPage} />{" "}
        {searched && (
          <Pagination
            count={totalPages}
            page={currentPage}
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
  );
};

export default Explore;
