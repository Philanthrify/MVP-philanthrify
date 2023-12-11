import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import {
  Avatar,
  Box,
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
import { useNavigate } from "react-router-dom";
import React from "react";
import { PersonAdd, Settings } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { RootState } from "@/redux/store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type AccountMenuProps = {
  setSelected: (value: string) => void;
  buttonStyles: object;
};
const AccountMenu = (props: AccountMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userType = useSelector((state: RootState) => state.auth.userType);
  const username = useSelector((state: RootState) => state.auth.username);
  const email = useSelector((state: RootState) => state.auth.email);

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
    props.setSelected("profile");
    navigate("/profile"); // Replace '/profile' with the path to your profile route
  };
  const goToDashboard = () => {
    handleClose(); // Assuming this closes the menu
    props.setSelected("dashboard");
    navigate("/dashboard"); // Replace '/profile' with the path to your profile route
  };
  const goToAddProject = () => {
    handleClose(); // Assuming this closes the menu
    props.setSelected("addproject");
    navigate("/addproject"); // Replace '/profile' with the path to your profile route
  };

  return (
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
              height: "48px",
              borderRadius: "1rem",
              color: palette.white.middle,
              backgroundColor: palette.background.light,
              "&:hover": {
                backgroundColor: palette.background.light,
              },
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {username ? username[0].toUpperCase() : ""}
            </Avatar>
            {username}
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
            backgroundColor: palette.background.light,
            color: palette.white.middle,
            borderRadius: "1rem", // Rounded edges
            width: "200px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
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
          sx={{ p: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "flex-end",
            }}
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
              {username ? username[0].toUpperCase() : ""}
            </Avatar>{" "}
          </Grid>
          <Grid item xs={9} sx={{ justifyContent: "flex-start" }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              {username}
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.300" }}>
              {email}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: palette.white.middle }} />
        <MenuItem onClick={goToDashboard} sx={{ color: palette.white.light }}>
          <ListItemIcon sx={{ color: palette.white.light }}>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>{" "}
        {userType === "CHARITY" && (
          <MenuItem onClick={handleClose} sx={{ color: palette.white.light }}>
            <ListItemIcon sx={{ color: palette.white.light }}>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Invite team member
          </MenuItem>
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
        <Divider sx={{ borderColor: palette.white.middle }} />
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
        <Divider sx={{ borderColor: palette.white.middle }} />
        <MenuItem onClick={handleLogout} sx={{ color: palette.white.light }}>
          <ListItemIcon sx={{ color: palette.white.light }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
