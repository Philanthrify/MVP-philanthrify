import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountMenu from "@/components/logout";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import BasicMenu from "@/components/BasicMenu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const username = useSelector((state: RootState) => state.auth.username);
  const userType = useSelector((state: RootState) => state.auth.userType);
  console.log(userType);
  const getButtonBoxStyle = (isSelected: boolean) => ({
    borderRadius: "1rem", // Rounded edges
    backgroundColor: isSelected
      ? palette.background.light
      : palette.background.main, // Dynamic background based on selection
    padding: "5px 10px", // Adjust as needed
    margin: "0 5px", // Space between buttons
    "&:hover": {
      backgroundColor: palette.primary.main, // Hover color
    },
  });
  const navbarStyles = {
    display: "flex",
    justifyContent: "space-between", // Distributes space evenly
    alignItems: "center",
    mb: "0.25",
    p: "0.5rem 0rem",
    color: palette.grey[300],
  };

  const leftBoxStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexGrow: 1, // Adjust as needed
  };

  const middleBoxStyle = {
    borderRadius: "1rem", // Rounded edges

    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    // backgroundColor: palette.background.light, // Set the background color
    flexGrow: 0, // Prevents growing
    justifyContent: "center",
  };

  const rightBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "0.75rem",
    flexGrow: 1, // Adjust as needed
  };
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
                selected === "dashboard"
                  ? palette.primary.main
                  : palette.grey[700],
              "&:hover": {
                color: palette.primary.light,
                backgroundColor: "transparent",
              },
            }}
            onClick={() => {
              setSelected("dashboard");
              navigate("/dashboard");
            }}
          >
            <DashboardIcon sx={{ marginRight: "8px" }} />
            Dashboard
          </Button>

          <Button
            // variant="text"
            sx={{
              color:
                selected === "explore"
                  ? palette.primary.main
                  : palette.grey[700],
              "&:hover": {
                color: palette.primary.light,
                backgroundColor: "transparent",
              },
            }}
            onClick={() => {
              setSelected("explore");
              navigate("/explore");
            }}
          >
            <ExploreIcon sx={{ marginRight: "8px" }} />
            Explore
          </Button>
          {userType === "CHARITY" && (
            <BasicMenu
              selected={selected}
              menuValue="projects"
              buttonLabel="Projects"
              menuItems={[
                {
                  label: "Add Project",
                  onClick: () => {
                    setSelected("projects");
                    navigate("/projects");
                  },
                },
                {
                  label: "View Your Projects",
                  onClick: () => {
                    console.log("View Your Projects");
                  },
                },
              ]}
            />
          )}
        </Box>
        {/* Middle */}

        {isLoggedIn && (
          <>
            <Box sx={middleBoxStyle}></Box>
            {/* RIGHT - Account Menu */}
            <Box sx={rightBoxStyle}>
              <AccountMenu username={username} />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Navbar;
