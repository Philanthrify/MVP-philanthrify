import AccountMenu from "@/components/AccountMenu";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";

import { setSelected as setNavbarSelected } from "@/redux/navbarSlice";
import { RootState } from "@/redux/store";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RightSide = () => {
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
          <SecondaryButton
          text="Login"
            onClick={() => {
              dispatch(setNavbarSelected("login"));
              navigate("/login");
            }}
          />
           
        )}
      </Grid>
    </Grid>
  );
};

export default RightSide;
