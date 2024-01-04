import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountMenu from "@/components/AccountMenu";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import BasicMenu from "@/components/BasicMenu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PrimaryButton from "@/components/Button/PrimaryButton";
type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [selected, setSelected] = useState("explore");
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userType = useSelector((state: RootState) => state.auth.userType);

  const navbarStyles = {
    display: "flex",
    justifyContent: "space-between", // Distributes space evenly
    alignItems: "center",
    // mb: "0.25",
    p: "0rem 3rem",
    color: palette.grey[300],
    height: "80px",
  };

  const leftBoxStyle = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  const rightBoxStyle = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "0.75rem",
  };
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <>
      <Box sx={navbarStyles}>
        {/* LEFT - Logo */}
        <Box sx={leftBoxStyle}>
          <AcUnitIcon sx={{ fontSize: "28px" }} />
          <Typography variant="h4" fontSize="16px">
            Philanthrify
          </Typography>
          <Button
            // variant="text"
            sx={{
              color:
                selected === "explore"
                  ? palette.white.light
                  : palette.white.middle,
              backgroundColor:
                selected === "explore" ? palette.background.light : null,
              "&:hover": {
                backgroundColor: "transparent",
                color: palette.white.light,
              },
            }}
            onClick={() => {
              setSelected("explore");
              navigate("/");
            }}
          >
            <ExploreIcon sx={{ marginRight: "8px" }} />
            Explore
          </Button>
          <Button
            // variant="text"
            sx={{
              color:
                selected === "howWorks"
                  ? palette.white.light
                  : palette.white.middle,
              backgroundColor:
                selected === "howWorks" ? palette.background.light : null,
              "&:hover": {
                backgroundColor: "transparent",
                color: palette.white.light,
              },
            }}
            onClick={() => {
              setSelected("howWorks");
              navigate("/howWorks");
            }}
          >
            <MenuBookIcon sx={{ marginRight: "8px" }} />
            How it works?
          </Button>
        </Box>

        {/* Middle */}

        <>
          {/* RIGHT - Account Menu */}
          <Box sx={rightBoxStyle}>
            {/* Depending on charity or donor */}
            {userType === "CHARITY" && isLoggedIn ? (
              <Button
                // variant="text"
                sx={{
                  color: palette.background.light,
                  backgroundColor: palette.primary.main,
                  "&:hover": {
                    backgroundColor: palette.primary.main,
                  },
                }}
                onClick={() => {
                  console.log("");
                }}
              >
                Fund a project
              </Button>
            ) : (
              <PrimaryButton
                text="Donate"
                onClick={() => {
                  console.log("");
                }}
              />
            )}

            {/* Depending on login status */}
            {isLoggedIn ? (
              <AccountMenu setSelected={setSelected} />
            ) : (
              <Button
                // variant="text"
                sx={{
                  color: palette.white.middle,
                  backgroundColor: palette.background.light,
                  "&:hover": {
                    color: palette.white.light,
                    backgroundColor: palette.background.light,
                  },
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </>
      </Box>
    </>
  );
};

export default Navbar;
