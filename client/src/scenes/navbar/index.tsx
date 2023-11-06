import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccountMenu from "@/components/logout";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {};

const Navbar = (props: Props) => {
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
          Site Name
        </Typography>
      </FlexBetween>
      {/* RIGHT */}
      <FlexBetween gap="0.75rem">
        {isLoggedIn && (
          <>
            {" "}
            <Box sx={{ "&:hover": { color: palette.primary.main } }}>
              <Link
                to={"/dashboard"}
                onClick={() => setSelected("dashboard")}
                style={{
                  color:
                    selected === "dashboard" ? "inherit" : palette.grey[700],
                  textDecoration: "inherit",
                }}
              >
                dashboard
              </Link>
            </Box>
            {userType === "CHARITY" && (
              <Box sx={{ "&:hover": { color: palette.primary.main } }}>
                <Link
                  to={"/projects"}
                  onClick={() => setSelected("projects")}
                  style={{
                    color:
                      selected === "projects" ? "inherit" : palette.grey[700],
                    textDecoration: "inherit",
                  }}
                >
                  projects
                </Link>
              </Box>
            )}
            <AccountMenu username={username} />
          </>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
