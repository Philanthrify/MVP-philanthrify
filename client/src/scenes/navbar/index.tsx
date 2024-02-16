import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import OwnAppBar from "./AppBar";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
const Navbar = () => {
  const theme = useTheme();

  const includeLogo = useMediaQuery("@media (min-width: 745px)");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ isMobile:", isMobile);
  }, [isMobile]);

  return (
    <div>
      {isMobile ? (
        <OwnAppBar />
      ) : (
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent={includeLogo ? "space-between" : "flex-start"}
          alignItems="center"
          sx={{
            marginTop: "8px",
            marginBottom: "15px",
            width: "85%", // Set width to 85% of the parent
            marginLeft: "auto", // Center the element
            marginRight: "auto",
          }}
        >
          <LeftSide />
          <RightSide />
        </Grid>
      )}
    </div>
  );
};

export default Navbar;
