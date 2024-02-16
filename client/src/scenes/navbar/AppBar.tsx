import { setSelected } from "@/redux/navbarSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
