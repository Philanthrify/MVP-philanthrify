import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormStyles from "@/components/FormsUI";
import { useEffect, useState } from "react";
import { countries } from "@/models/country";
import { SxProps, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CountrySelectProps {
  sxProps?: SxProps;
  value: string | null;
  onChange: (event: React.SyntheticEvent, newValue: string) => void; // Function to update Formik's value
}

// TODO: make a

export default function CountrySelect(props: CountrySelectProps) {
  const { palette } = useTheme();
  const [country, setCountry] = useState(props.value);
  const textFieldProps = FormStyles();
  // Find the country object by its name, or return null if not found or if the name is empty
  const findSelectedCountryByCode = (countryName: string | null) => {
    return countryName
      ? countries.find((country) => country.label === countryName)
      : null;
  };
  // Effect hook to update the local state when the Redux state changes
  useEffect(() => {
    // If the Redux country value is an empty string, set the local country state to null to clear the Autocomplete
    if (props.value === "") {
      setCountry(null);
    } else {
      setCountry(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    console.log("Selected Country Changed:", props.value);
  }, [props.value]);
  return (
    <>
      <Autocomplete
        id="country-select-demo"
        sx={{
          width: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: palette.white.light,
        }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        value={findSelectedCountryByCode(country)}
        onChange={(event, newValue) => {
          // Call the onChange prop with null when the new value is null
          props.onChange(event, newValue ? newValue.label : "");
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{
              "& > img": { mr: 2, flexShrink: 0 },

              backgroundColor: "background.dark",
              color: palette.white.light,
          
            
              
              "&:hover": {
                backgroundColor: "background.dark",
                color: "background.dark",
              },
            }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            autoComplete="off"
            placeholder="Select a country"
            
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            classes={{ ...textFieldProps.selectClasses }}
            sx={{
              ...props.sxProps,
              "&:hover": {
                //backgroundColor: 'grey.900',
              },
            }}
          />
        )}
      />
    </>
  );
}
