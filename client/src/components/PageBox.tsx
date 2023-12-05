import { Box } from "@mui/material";
import { styled } from "@mui/system";

const PageBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,.8)",
  width: "70%", // Set the width to 70% of the parent container
  maxWidth: "100%", // Optional: To ensure it doesn't exceed the viewport width
  margin: "0 auto 20px", // Adjust external margin as needed
  padding: "20px", // Adjust internal padding as needed
}));

export default PageBox;
