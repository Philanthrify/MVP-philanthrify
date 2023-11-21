import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FormStyles from ".";

// TODO (Tomos): commas between the digits
// TODO (Fergus): have dropdown for preferred currency

interface AmountInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  const theme = useTheme();
  const textFieldProps = FormStyles();
  const defaultTextColor = theme.palette.grey.main;

  return (
    <TextField
      fullWidth
      id="targetAmount"
      name="targetAmount"
      label="Target Amount"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              color: defaultTextColor,
              "& .MuiTypography-root": { color: defaultTextColor },
            }}
          >
            $
          </InputAdornment>
        ),
      }}
      sx={{
        ...textFieldProps.textField,
        width: textFieldProps.textFieldWidth,
      }}
    />
  );
};

export default AmountInput;
