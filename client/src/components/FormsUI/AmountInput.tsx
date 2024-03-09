import { InputAdornment, TextField, useTheme } from "@mui/material";
import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";

// TODO (Tomos): commas between the digits

interface AmountInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  label: string;
  id: string; // when using formik we need to match this with the name of the formik value
  name: string; // when using formik we need to match this with the name of the formik value
  width: any; // string/number
  currencyCode: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  label,
  id,
  name,
  currencyCode,
}) => {
  const { palette } = useTheme();
  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      inputProps={{ maxLength: 11 }}
      label={label}
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
              textAlign: "center",
              marginLeft: "10px", // TODO: not working for some reason
              "& .MuiTypography-root": { color: palette.grey[700] },
            }}
          >
            {getSymbolFromCurrency(currencyCode)}
          </InputAdornment>
        ),
      }}
      sx={{}}
    />
  );
};

export default AmountInput;
