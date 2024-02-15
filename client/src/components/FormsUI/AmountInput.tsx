import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import FormStyles from ".";

// TODO (Tomos): commas between the digits
// TODO (Fergus): have dropdown for preferred currency

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
}) => {
  const textFieldProps = FormStyles();

  return (
    <TextField
      fullWidth
      id={id}
      name={name}
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
            sx={
              {
                // TODO: not working for some reason
                // color: palette.primary.main,
                // "& .MuiTypography-root": { color: palette.grey[700] },
              }
            }
          >
            $
          </InputAdornment>
        ),
      }}
      sx={{}}
    />
  );
};

export default AmountInput;
