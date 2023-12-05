import { Box, useMediaQuery } from "@mui/material";

import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

// grid layout
const gridTemplateLargeScreen = `
"a a b"
"a a b"
"a a e"
"c d e"
"c d e"
"c d e"
"c d e"
"f f f"
"f f f"
"f f f"
"f f f"
`;
// grid layout
const gridTemplateSmallScreen = `
"a"
"a"
"b"
"b"
"c"
"c"
"c"
"c"
"d"
"d"
"d"
"d"
"e"
"e"
"e"
"e"
"f"
"f"
"f"
`;
const Dashboard = () => {
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
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(75px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreen,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreen,
            }
      }
    >
      {/* Power of grid template areas */}
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
