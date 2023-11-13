import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountMenu from "@/components/logout";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import BasicMenu from "@/components/BasicMenu";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const username = useSelector((state: RootState) => state.auth.username);
  const userType = useSelector((state: RootState) => state.auth.userType);
  console.log(userType);

  return (
    <FlexBetween mb="0.25" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT */}
      <FlexBetween gap="0.75rem">
        <AcUnitIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Philanfrify
        </Typography>
      </FlexBetween>
      {/* RIGHT */}
      <FlexBetween gap="0.75rem">
        {isLoggedIn && (
          <>
            {" "}
            <Button
              variant="text"
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
              Dashboard
            </Button>
            <BasicMenu
              selected={selected}
              menuValue="subscriptions"
              buttonLabel="Subscriptions"
              menuItems={[
                {
                  label: "Charities",
                  onClick: () => {
                    setSelected("subscriptions");
                    console.log("View Your Subscribed Charities");
                  },
                },
                {
                  label: "Projects",
                  onClick: () => {
                    setSelected("subscriptions");
                    console.log("View Your Subscribed Projects");
                  },
                },
              ]}
            />
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
            <AccountMenu username={username} />
          </>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
