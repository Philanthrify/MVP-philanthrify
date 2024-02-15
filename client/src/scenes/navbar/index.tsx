import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import MenuIcon from "@mui/icons-material/Menu";
import OwnAppBar from "./AppBar";
import { useDispatch } from "react-redux";
import { setSelected as setNavbarSelected } from "@/redux/navbarSlice";
const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string>("explore");
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
          <LeftSide selected={selected} setSelected={setSelected} />
          <RightSide setSelected={setSelected} />
        </Grid>
      )}

      {/* </Box> */}
    </div>
  );
};

export default Navbar;
