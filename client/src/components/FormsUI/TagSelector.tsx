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
import React, { useEffect } from "react";
import FormStyles from ".";
import { TagValuesObj } from "@/models/tagValues";

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
type TagSelectorProps = {
  value: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
};

const TagSelector = (props: TagSelectorProps) => {
  const textFieldProps = FormStyles();
  const { palette } = useTheme();
  useEffect(() => {
    console.log(
      "🚀 ~ file: TagSelector.tsx:37 ~ TagSelector ~ props.value:",
      props.value
    );
  }, [props.value]);
  const renderValue = (selectedKeys: string[]) => {
    return selectedKeys
      .map((key) => TagValuesObj[key] || key) // Map each key to its value from TagValuesObj
      .join(", ");
  };
  return (
    <>
      {" "}
      <FormControl
        sx={{ width: textFieldProps.textFieldWidth, maxWidth: "80%" }}
      >
        <InputLabel
          id="demo-multiple-checkbox-label"
          sx={{
            ...textFieldProps.inputLabel,
          }}
        >
          Tags
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
            ...textFieldProps.select,
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {Object.entries(TagValuesObj).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={props.value.indexOf(key) > -1} />
              <ListItemText primary={value} />{" "}
              {/* Display the value with spaces */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default TagSelector;
