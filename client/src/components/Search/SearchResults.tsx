import { Box, Button, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "@/models/project";
import ResultBox from "./ResultBox";

// grid layout
const gridTemplateLargeScreen = `
"a1 b1 c1"
"a2 b2 c2"
"a3 b3 c3"
"a4 b4 c4"
"a5 b5 c5"
`;

interface SearchResultProps {
  projects: Project[];
  currentPage: number;
}

const SearchResult = (props: SearchResultProps) => {
  const itemsPerPage = 15;
  useEffect(() => {
    console.log("Current Page: ", props.currentPage);
  }, [props.currentPage]);
  const indexOfLastItem = props.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.projects.slice(indexOfFirstItem, indexOfLastItem);
  function getGridAreaName(index: number): string {
    const column = String.fromCharCode(97 + (index % 3)); // 'a', 'b', 'c', etc.
    const row = Math.floor(index / 3) + 1; // 1, 2, 3, etc.
    return column + row; // 'a1', 'b1', 'c1', 'a2', etc.
  }
  const isAboveMediumScreens = useMediaQuery("@media (min-width: 1100px)");
  const isAboveSmallScreens = useMediaQuery("@media (min-width: 700px)");
  let gridStyle;

  gridStyle = {
    display: "grid",

    gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
    gridTemplateRows: "repeat(5, minmax(200px, 1fr))",
    gridTemplateAreas: gridTemplateLargeScreen,
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5rem",
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: SearchResults.tsx:102 ~ SearchResult ~ projects:",
      props.projects
    );
  }, [props.projects]);

  return (
    <>
      <Box
        width="100%"
        height="100%"
        display="grid"
        gap="1.5rem"
        paddingBottom="30px"
        sx={gridStyle}
      >
        {currentItems.map((project, index) => (
          <ResultBox
            key={project.id}
            project={project}
            sx={{ gridArea: getGridAreaName(index) }}
          />
        ))}
      </Box>
    </>
  );
};

export default SearchResult;
