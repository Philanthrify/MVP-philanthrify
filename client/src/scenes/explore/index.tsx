import React, { useState } from "react";

import axios from "axios";
import SearchTextField from "@/components/Search/SearchTextField";
import { Grid, useTheme } from "@mui/material";
import Page from "@/components/Page";
import TypographyTitle from "@/components/Title";
import SearchResult from "@/components/Search/SearchResult";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

const Explore = () => {
  const [projects, setProjects] = useState([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const fetchProjects = async (searchTerm: string) => {
    try {
      console.log(searchTerm);
      axios({
        method: "get",
        url: "http://localhost:1337/project",
        headers: {
          "Content-Type": "application/json",
        },
        params: { search: searchTerm, page: 1, pageSize: 3 },
        // data: ,
        withCredentials: true,
      }).then((response) => {
        console.log(response);
      });
      //   setProjects(response.data);
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
      <Page>
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
          {/* <SearchResult projects={projects} /> */}
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <div>the projects</div>
          <SearchResult />
        </Grid>
      </Page>
    </Grid>
  );
};

export default Explore;
