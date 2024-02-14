import React from "react";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { setSelected } from "@/redux/navbarSlice";
interface OwnAppBar {}
const OwnAppBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Philanthrify
        </Typography>
        <Button
          // variant="text"
          sx={{
            backgroundColor: "#3B3B41",
            "&:hover": {
              backgroundColor: "#53535B",
              transform: "scale(0.96)",
              transition: "transform 0.17s",
              easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
          }}
          onClick={() => {
            setSelected("login");
            navigate("/login");
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default OwnAppBar;
