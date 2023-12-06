import { Box, Button, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "@/models/project";
import ResultBox from "./ResultBox";
// TODO: reset page number when you do a new search

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
  const numRows = Math.ceil(currentItems.length / 3);
  useEffect(() => {
    console.log("currentItems: ", currentItems);
    console.log("numRows: ", numRows);
  }, [currentItems]);
  function getGridAreaName(index: number): string {
    const column = String.fromCharCode(97 + (index % 3)); // 'a', 'b', 'c', etc.
    const row = Math.floor(index / 3) + 1; // 1, 2, 3, etc.
    return column + row; // 'a1', 'b1', 'c1', 'a2', etc.
  }
  const isAboveMediumScreens = useMediaQuery("@media (min-width: 1100px)");
  const isAboveSmallScreens = useMediaQuery("@media (min-width: 700px)");

  /* creates grid template suchas this (for 5 rows):
const gridTemplateLargeScreen = `
"a1 b1 c1"
"a2 b2 c2"
"a3 b3 c3"
"a4 b4 c4"
"a5 b5 c5"
`;

*/
  const generateGridTemplateAreas = (numRows: number) => {
    let gridTemplateAreas = "";
    for (let row = 1; row <= numRows; row++) {
      gridTemplateAreas += `"a${row} b${row} c${row}" `;
    }
    return gridTemplateAreas.trim();
  };

  // uses effects of numrows potentially
  let gridStyle;
  gridStyle = {
    display: "grid",

    gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
    gridTemplateRows: `repeat(${numRows}, minmax(300px, 1fr))`,
    gridTemplateAreas: generateGridTemplateAreas(numRows),
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
