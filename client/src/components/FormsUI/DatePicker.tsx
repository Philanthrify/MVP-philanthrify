import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import FormStyles from ".";
import { useTheme } from "@mui/material";

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  // const [date, setDate] = useState<Dayjs | null>(null);
  const textFieldProps = FormStyles();
  const { palette } = useTheme();
  const [cleared, setCleared] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <Box sx={{ width: textFieldProps.textFieldWidth }}>
      {" "}
      {/* Outer container with controlled width */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <DemoItem>
            <DatePicker
              value={value}
              onChange={(newDate) => onChange(newDate)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: palette.primary.main,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: palette.primary.main,
                  },
              }}
              slotProps={{
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
          </DemoItem>

          {cleared && (
            <Alert
              sx={{ position: "absolute", bottom: 0, right: 0 }}
              severity="success"
            >
              Field cleared!
            </Alert>
          )}
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default CustomDatePicker;
