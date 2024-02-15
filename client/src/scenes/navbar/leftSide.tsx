import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import PhilanthrifyLogoWithText from "@/components/Icons/PhilanthrifyLogoWithText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelected as setNavbarSelected } from "@/redux/navbarSlice";
import { RootState } from "@/redux/store";

const LeftSide = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  // hide logo if page is too small
  const includeLogo = useMediaQuery("@media (min-width: 745px)");
  const dispatch = useDispatch();
  const navbarSelected = useSelector(
    (state: RootState) => state.navbar.selected
  );
  return (
    <Grid
      item
      container
      direction="row"
      xs={6}
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
      wrap="nowrap"
    >
      {includeLogo && (
        <Grid item>
          <Button
            sx={{
              padding: 1, // Removes padding inside the button
              minWidth: 0, // Allows the button to shrink to the size of its contents
              "&:hover": {
                backgroundColor: "transparent", // Keeps the background transparent on hover
              },
            }}
            onClick={() => {
              dispatch(setNavbarSelected("explore"));

              navigate("/");
            }}
          >
            <PhilanthrifyLogoWithText />
          </Button>
        </Grid>
      )}
      <Grid item>
        {" "}
        <Button
          // variant="text"
          sx={{
            color:
              navbarSelected === "explore"
                ? palette.white.light
                : palette.white.middle,
            height: "50px",
            backgroundColor: navbarSelected === "explore" ? "#3B3B41" : null,
            "&:hover": {
              backgroundColor: "#3B3B41",
              color: palette.white.light,
              transform: "scale(0.97)",

              transition: "transform 0.16s ease-in-out",
            },
            padding: "0 17px",
          }}
          onClick={() => {
            dispatch(setNavbarSelected("explore"));
            navigate("/");
          }}
        >
          <ExploreIcon sx={{ marginRight: "8px" }} />
          Explore
        </Button>
      </Grid>{" "}
      <Grid item>
        <Button
          // variant="text"
          sx={{
            color:
              navbarSelected === "how-it-works"
                ? palette.white.light
                : palette.white.middle,
            height: "50px",
            backgroundColor:
              navbarSelected === "how-it-works" ? "#3B3B41" : null,
            "&:hover": {
              backgroundColor: "#3B3B41",
              color: palette.white.light,
              transform: "scale(0.97)",
              transition: "transform 0.15s ease-in-out",
            },
            padding: "0 17px",
          }}
          onClick={() => {
            dispatch(setNavbarSelected("how-it-works"));

            navigate("/how-it-works");
          }}
        >
          <MenuBookIcon sx={{ marginRight: "8px" }} />
          How it works?
        </Button>
      </Grid>{" "}
    </Grid>
  );
};

export default LeftSide;
