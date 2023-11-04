import { useTheme } from "@mui/material";

const FormStyles = () => {
  const { palette } = useTheme();
  return {
    textField: {
      "& .MuiInputLabel-outlined": {
        color: palette.grey.main,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: palette.grey.main,
      },
      "& .MuiInputBase-input": {
        color: palette.grey.main, // Default color of the text
        "&:-webkit-autofill": {
          // Styles for autofilled input
          WebkitTextFillColor: palette.grey.main, // Text color
          WebkitBoxShadow: "0 0 0px 1000px white inset", // Background color
        },
      },
      // Add padding or any other styles here
      padding: "10px 0",
      width: "400px", // Example fixed height
      "& .MuiOutlinedInput-input": {
        padding: "12px 14px", // Adjust the padding to make sure the text is well placed
      },
      //   minWidth: "300px",
    },
    // ... Add other style objects if necessary
  };
};

export default FormStyles;
