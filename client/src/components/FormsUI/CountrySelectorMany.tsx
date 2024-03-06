import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import FormStyles from ".";
import { countries, CountryType } from "@/models/country";
import { mapValues } from "@/models/tagValues";
// import { mapValues } from "@/models/WidespreadModels";

// takes the value and the onChange func as props and
// will handle value changes accordingly
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
type CountrySelectorProps = {
  value: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
};

const CountrySelector = (props: CountrySelectorProps) => {
  const { palette } = useTheme();
  const textFieldProps = FormStyles();
  useEffect(() => {
    console.log(
      "🚀 ~ file: CountrySelector.tsx:37 ~ CountrySelector ~ props.value:",
      props.value
    );
  }, [props.value]);
  const renderValue = (selectedKeys: string[]) => {
    return mapValues(selectedKeys).join(", ");
  };
  console.log(
    "🚀 ~ file: CountrySelector.tsx:66 ~ CountrySelector ~ props.handleChange:",
    props.handleChange
  );
  return (
    <>
      <FormControl sx={{ width: "85%" }}>
        <InputLabel
          id="demo-multiple-checkbox-label"
          sx={
            {
              // ...textFieldProps.inputLabel,
            }
          }
        >
          Contries
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={props.value}
          onChange={props.handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={renderValue}
          MenuProps={MenuProps}
          classes={{ ...textFieldProps.selectClasses }}
          sx={{
            width: "300px", // keep from overflowing
            maxWidth: "100%",
          }}
        >
          {countries.map((country: CountryType) => (
            <MenuItem key={country.code} value={country.code}>
              <Checkbox
                checked={(props.value ?? []).indexOf(country.code) > -1}
                sx={{ color: palette.primary.main }}
              />
              <ListItemText primary={country.label} />{" "}
              {/* Display the value with spaces */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CountrySelector;
