import { SxProps, useTheme } from "@mui/material";

type FormStylesReturnType = {
  textField: SxProps;
  button: SxProps;
  spacing: SxProps;
  select: SxProps;
  textFieldWidth: string;
  searchTextFieldWidth: string;
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
    "& .MuiInputLabel-outlined": {
      color: palette.grey.main,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.grey.main,
    },
    "& .MuiInputBase-input": {
      color: palette.grey.main,
      "&:-webkit-autofill": {
        WebkitTextFillColor: palette.grey.main,
        WebkitBoxShadow: "0 0 0px 1000px white inset",
      },
    },
    padding: "10px 0px",
  });

  const getSpacingStyles = (): SxProps => ({
    padding: "10px 0px",
  });

  return {
    textField: getTextFieldStyles(),
    button: getButtonStyles(),
    spacing: getSpacingStyles(),
    select: getSelectStyles(),
    textFieldWidth: "70%",
    searchTextFieldWidth: "40%",
  };
};

export default FormStyles;
