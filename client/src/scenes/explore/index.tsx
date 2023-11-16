import React, { useState } from "react";

import axios from "axios";
import SearchTextField from "@/components/Search/SearchTextField";
import { Grid, useTheme } from "@mui/material";
import Page from "@/components/Page";
import TypographyTitle from "@/components/Title";

const Explore = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async (searchTerm: string) => {
    try {
      console.log(searchTerm);
      //   const response = await axios.get(
      //     `http://localhost:3000/search?query=${searchTerm}`
      //   );
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
          {/* <SearchResult projects={projects} /> */}
        </Grid>
      </Page>
    </Grid>
  );
};

export default Explore;
