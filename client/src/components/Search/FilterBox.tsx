import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Define the props type
interface FilterBoxProps {
  text: string;
  onDelete: () => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({ text, onDelete }) => {
  return (
    <Box
      sx={{
        height: "30px",
        backgroundColor: "#1A1E29", // Dark background color
        color: "#A4A6AD", // White text color
        padding: "4px 8px", // Adjust padding to center the text and match the height
        borderRadius: "8px", // Slightly rounded corners
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #383B46", // Border color
        fontSize: "0.4rem", // Small text
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif", // Use a common font stack
        userSelect: "none", // Prevent text selection
        cursor: "default", // Default cursor
      }}
    >
      <Typography variant="body1">{text}</Typography>{" "}
      <IconButton
        size="small"
        onClick={onDelete}
        sx={{
          color: "#A4A6AD", // Match the text color
          marginLeft: "4px", // Space between text and icon
          padding: "0px", // Reduce padding to fit the design
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default FilterBox;
