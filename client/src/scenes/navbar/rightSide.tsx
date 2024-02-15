import AccountMenu from "@/components/AccountMenu";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { RootState } from "@/redux/store";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelected as setNavbarSelected } from "@/redux/navbarSlice";

interface RightSideProps {
  setSelected: (value: string) => void;
}

const RightSide: React.FC<RightSideProps> = ({ setSelected }) => {
  const userType = useSelector((state: RootState) => state.auth.userType);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const includeLogo = useMediaQuery("@media (min-width: 745px)");
  const dispatch = useDispatch();

  return (
    <Grid
      item
      container
      xs={5}
      direction="row"
      spacing={2}
      justifyContent={includeLogo ? "flex-end" : "flex-start"}
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item>
        {" "}
        {/* Depending on charity or donor */}
        {userType === "CHARITY" && isLoggedIn ? (
          <Button
            // variant="text"
            sx={{
              padding: "0 24px",
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
              dispatch(setNavbarSelected("donate"));

              console.log("");
            }}
          />
        )}
      </Grid>{" "}
      <Grid item>
        {" "}
        {/* Depending on login status */}
        {isLoggedIn ? (
          <AccountMenu />
        ) : (
          <Button
            // variant="text"
            sx={{
              color: palette.white.light,
              backgroundColor: "#3B3B41",
              "&:hover": {
                color: palette.white.light,
                backgroundColor: "#53535B",
                transform: "scale(0.96)",
                transition: "transform 0.17s",
                easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
              },
            }}
            onClick={() => {
              dispatch(setNavbarSelected("login"));
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default RightSide;
