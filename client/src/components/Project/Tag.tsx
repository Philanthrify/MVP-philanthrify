import React from "react";
import { Box, Typography } from "@mui/material";

// Define the props type
interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <Box
      sx={{
        height: "20px",
        backgroundColor: "#111111", // Dark background color
        color: "#FFFFFF", // White text color
        padding: "2px 8px", // Adjust padding to center the text and match the height
        borderRadius: "4px", // Slightly rounded corners
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #313135", // Border color
        fontSize: "0.75rem", // Small text
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif", // Use a common font stack
        userSelect: "none", // Prevent text selection
        cursor: "default", // Default cursor
      }}
    >
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
};

export default Tag;
