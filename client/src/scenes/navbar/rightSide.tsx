import AccountMenu from "@/components/AccountMenu";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { RootState } from "@/redux/store";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface RightSideProps {
  setSelected: (value: string) => void;
}

const RightSide: React.FC<RightSideProps> = ({ setSelected }) => {
  const userType = useSelector((state: RootState) => state.auth.userType);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const includeLogo = useMediaQuery("@media (min-width: 745px)");

  
  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      lg={6}
      container
      direction="row"
      spacing={2}
      justifyContent={includeLogo ? "flex-end" : "flex-start"}
      alignItems="center"
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
              setSelected("donate");

              console.log("");
            }}

          />
        )}
      </Grid>{" "}
      <Grid item>
        {" "}
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
              setSelected("login");
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
