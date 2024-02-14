import { Box } from "@mui/material";
import { styled } from "@mui/system";
//import line from 'MVP-philanthrify/client/dist/assets/line.png';
import line from "/Users/benjaminvimont/Documents/GitHub/MVP-philanthrify/client/src/assets/line.png";


const PageBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#0F0F13",
  borderRadius: "1.75rem",
  boxShadow: "0.15rem 0.15rem 0.45rem 0.15rem rgba(0,0,0,0.10)", // Increased blur and decreased opacity
  width: "700%", // Set the width to 70% of the parent container
  maxWidth: "1280px",
  minHeight: "510px",
  margin: "0 auto", // Adjust external margin as needed
  padding: "50px 20px", // Adjust internal padding as needed
  display: "flex", // Center all elements horizontally
  justifyContent: "center", // Center all elements horizontally
  alignItems: "center", // Center all elements vertically
  backgroundImage: `url(${line})`, // Use the imported image
  backgroundRepeat: "no-repeat", // Ensure the image is not repeated
  backgroundSize: "140%", // Cover the entire background
  backgroundPosition: "center center",
}));

export default PageBox;
