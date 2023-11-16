import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Page = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  //   boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,0.8)",
  width: "75%", // Sets the width to 80% of the parent element
  //   display: "flex",

  //   justifyContent: "center",
  //   alignItems: "center",
  minHeight: "100vh", // Sets the minimum height to be equal to the viewport height
}));

export default Page;
