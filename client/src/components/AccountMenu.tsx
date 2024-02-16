import { logout } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { PersonAdd, Settings } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Logout from "@mui/icons-material/Logout";
import PaidIcon from "@mui/icons-material/Paid";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTeamMemberModal from "./AddTeamMemberModal";
import { setSelected as setNavbarSelected } from "@/redux/navbarSlice";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userType = useSelector((state: RootState) => state.auth.userType);
  const firstname = useSelector((state: RootState) => state.auth.firstname);
  //const email = useSelector((state: RootState) => state.auth.email);
  const charity = useSelector((state: RootState) => state.auth.charity);
  console.log("🚀 ~ AccountMenu ~ charity:", charity);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };
  const goToProfile = () => {
    handleClose(); // Assuming this closes the menu
    dispatch(setNavbarSelected("profile"));
    navigate("/profile"); // Replace '/profile' with the path to your profile route
  };
  const goToDashboard = () => {
    handleClose(); // Assuming this closes the menu
    dispatch(setNavbarSelected("dashboard"));
    navigate("/dashboard"); // Replace '/profile' with the path to your profile route
  };
  const goToAddProject = () => {
    handleClose(); // Assuming this closes the menu
    dispatch(setNavbarSelected("addproject"));
    navigate("/addproject"); // Replace '/profile' with the path to your profile route
  };
  const goToTransactionAdd = () => {
    handleClose(); // Assuming this closes the menu
    dispatch(setNavbarSelected("add -transaction"));
    navigate("/addtransaction"); // Replace '/profile' with the path to your profile route
  };
  const handleOpenModal = () => {
    handleClose();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <AddTeamMemberModal open={isModalOpen} onClose={handleCloseModal} />
      <React.Fragment>
        <Tooltip title="Account Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ height: "100%" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Button // same button styles as in parent
              sx={{
                minWidth: "80px",
                // height: "48px",
                color: "#A4A6AD",
                backgroundColor: "#394056",
                "&:hover": {
                  backgroundColor: "#4C5572",
                  color: palette.white.light,
                },
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.7rem",
                padding: "12px 12px",
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {firstname ? firstname[0].toUpperCase() : ""}
              </Avatar>
              {firstname}
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              backgroundColor: "#303548",
              color: palette.white.middle,
              borderRadius: "1.25rem", // Rounded edges
              width: "230px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 42,
                height: 42,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              item
              xs={4}
              justifyContent="center"
              alignItems="flex-end"
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  mb: 1,
                  bgcolor: palette.primary.main,
                }}
              >
                {" "}
                {/* Adjust size as needed */}
                {firstname ? firstname[0].toUpperCase() : ""}
              </Avatar>{" "}
            </Grid>
            <Grid
              container
              item
              xs={8}
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography variant="body1" sx={{ color: palette.white.light }}>
                {firstname}
              </Typography>
              {charity && (
                <Typography variant="caption">{charity.charityName}</Typography>
              )}

              {/* I remove the email line because is too long and we can add it to the profile page later Commented out the line to display email */}
              {/* {charity && (
    <Typography variant="caption">{charity.charityName}</Typography>
  )} */}
              {/* <Typography variant="caption" sx={{ color: palette.white.light }}>
    {email}
  </Typography> */}
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: "#535766" }} />
          <MenuItem onClick={goToDashboard} sx={{ color: palette.white.light }}>
            <ListItemIcon sx={{ color: palette.white.light }}>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>{" "}
          {userType === "CHARITY" && (
            <>
              <MenuItem
                onClick={handleOpenModal}
                sx={{ color: palette.white.light }}
              >
                <ListItemIcon sx={{ color: palette.white.light }}>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Invite team member
              </MenuItem>{" "}
              <MenuItem
                onClick={goToTransactionAdd}
                sx={{ color: palette.white.light }}
              >
                <ListItemIcon sx={{ color: palette.white.light }}>
                  <PaidIcon fontSize="small" />
                </ListItemIcon>
                Confirm a transaction
              </MenuItem>
            </>
          )}{" "}
          {userType === "CHARITY" && (
            <MenuItem
              onClick={goToAddProject}
              sx={{ color: palette.white.light }}
            >
              <ListItemIcon sx={{ color: palette.white.light }}>
                <AddCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              Start a project
            </MenuItem>
          )}
          <MenuItem onClick={goToProfile} sx={{ color: palette.white.light }}>
            <ListItemIcon sx={{ color: palette.white.light }}>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            View Profile
          </MenuItem>
          <Divider sx={{ borderColor: "#535766" }} />
          <MenuItem onClick={handleClose} sx={{ color: palette.white.light }}>
            <ListItemIcon sx={{ color: palette.white.light }}>
              <ContactSupportIcon fontSize="small" />
            </ListItemIcon>
            Contact us
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: palette.white.light }}>
            <ListItemIcon sx={{ color: palette.white.light }}>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider sx={{ borderColor: "#535766" }} />
          <MenuItem onClick={handleLogout} sx={{ color: palette.white.light }}>
            <ListItemIcon sx={{ color: palette.white.light }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    </>
  );
};

export default AccountMenu;
