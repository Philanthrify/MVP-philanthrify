import { Box, useMediaQuery } from "@mui/material";
import React from "react";

// grid layout
const gridTemplateLargeScreen = `
"a b c"
"a b c"
"a b c"
"d e f"
"d e f"
"d e f"
"g h i"
"g h i"
"g h i"
`;
// grid layout
const gridTemplateMediumScreen = `
"a b"
"a b"
"c d"
"c d"
"e f"
"e f"
"g h"
"g h"
`;

// grid layout
const gridTemplateSmallScreen = `
"a"
"a"
"b"
"b"
"c"
"c"
"d"
"d"
"e"
"e"
"f"
"f"
"g"
"g"
"h"
"h"
"i"
"i"
`;

const SearchResult = () => {
  const isAboveMediumScreens = useMediaQuery("@media (min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(100px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreen,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreen,
            }
      }
    >
      <Box gridArea="a" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="b" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="c" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="d" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="e" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="f" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="g" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="h" style={{ backgroundColor: "blue" }}></Box>
      <Box gridArea="i" style={{ backgroundColor: "blue" }}></Box>

      {/* Power of grid template areas */}
    </Box>
  );
};

export default SearchResult;
