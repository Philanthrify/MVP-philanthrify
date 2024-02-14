import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import PhilanthrifyLogoWithText from "@/components/Icons/PhilanthrifyLogoWithText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import React from "react";

interface LeftSideProps {
  selected: string;
  setSelected: (value: string) => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ selected, setSelected }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  // hide logo if page is too small
  const includeLogo = useMediaQuery("@media (min-width: 745px)");

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={8}
      lg={6}
      container
      direction="row"
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
      
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
              setSelected("explore");
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
              selected === "explore"
                ? palette.white.light
                : palette.white.middle,
                height: "50px",
            backgroundColor:
              selected === "explore" ? "#3B3B41" : null,
            "&:hover": {
              backgroundColor: "#3B3B41",
              color: palette.white.light,
              transform: "scale(0.97)",
              
          transition: 'transform 0.16s ease-in-out',
            },
            padding: "0 17px",
          }}
          onClick={() => {
            setSelected("explore");
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
              selected === "how-it-works"
                ? palette.white.light
                : palette.white.middle,
                height: "50px",
            backgroundColor:
              selected === "how-it-works" ? "#3B3B41" : null,
            "&:hover": {
              backgroundColor: "#3B3B41",
              color: palette.white.light,
              transform: "scale(0.97)",
          transition: 'transform 0.15s ease-in-out',
            },
            padding: "0 17px",
          }}
          onClick={() => {
            setSelected("how-it-works");
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
