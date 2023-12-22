import { SxProps, useTheme } from "@mui/material";

type FormStylesReturnType = {
  textField: SxProps;
  button: SxProps;
  spacing: SxProps;
  select: SxProps;
  inputLabel: SxProps;
  stepper: SxProps;
  textFieldWidth: string;
  searchTextFieldWidth: string;
  selectClasses: object;
};

const FormStyles = (): FormStylesReturnType => {
  const { palette } = useTheme();
  const defaultTextColor = palette.grey.main;

  const getTextFieldStyles = (): SxProps => ({
    "& .MuiInputLabel-outlined": {
      color: defaultTextColor,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: defaultTextColor,
    },
    "& .MuiInputBase-input": {
      color: defaultTextColor,
      "&:-webkit-autofill": {
        WebkitTextFillColor: defaultTextColor,
        WebkitBoxShadow: "0 0 0px 1000px white inset",
      },
    },
    padding: "10px 0",
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px",
    },
  });

  const getButtonStyles = (): SxProps => ({
    backgroundColor: palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: palette.primary.dark,
    },
  });

  const getSelectStyles = (): SxProps => ({
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.grey.main,
    },
    "& .MuiSelect-select": {
      // Target the text inside the select
      color: palette.grey.main, // Replace with the color you want for the text
      // If the above doesn't work, try targeting the child span explicitly
      "& > span": {
        color: palette.grey.main, // Replace with the color you want for the text
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      // Label color when the input is focused
      color: palette.primary.main, // Replace with your focused color
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "defaultBorderColor", // default border color
      },
      "&.Mui-focused fieldset": {
        borderColor: palette.primary.main, // border color when focused
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px", // border width when focused
      },
      // Apply colors for text and icons when focused and not focused
      "& input": {
        color: palette.grey.main, // default text color
      },
      "& input.Mui-focused": {
        color: palette.primary.main, // text color when focused
      },
    },
    "& .MuiSelect-icon": {
      color: "grey", // Replace with your theme color or specific grey color code
    },
    padding: "10px 0px",
  });

  const getSpacingStyles = (): SxProps => ({
    padding: "10px 0px",
  });
  const getInputLabel = (): SxProps => ({
    "&.Mui-focused": {
      color: palette.primary.main,
    },
    color: palette.grey.main,
  });
  const getStepper = (): SxProps => ({
    // Custom styles here
    ".MuiStepLabel-label": {
      // Style for the step label
      color: palette.grey.main, // Example color
    },
    ".MuiStepIcon-root": {
      // Style for the step icon
      color: palette.grey.main, // Example color for untried steps
    },
  });
  const getSelectClasses = () => ({
    root: palette.grey.main,
    icon: palette.grey.main,
  });
  return {
    textField: getTextFieldStyles(),
    button: getButtonStyles(),
    spacing: getSpacingStyles(),
    select: getSelectStyles(),
    inputLabel: getInputLabel(),
    stepper: getStepper(),
    textFieldWidth: "70%",
    searchTextFieldWidth: "40%",
    // classes
    selectClasses: getSelectClasses(),
  };
};

export default FormStyles;
