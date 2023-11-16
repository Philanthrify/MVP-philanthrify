import { Button, InputAdornment, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import FormStyles from "../FormsUI";
import SearchIcon from "@mui/icons-material/Search";

type SearchTextFieldProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchTextField = (props: SearchTextFieldProps) => {
  const textFieldProps = FormStyles();
  const { palette } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = () => {
    props.onSearch(searchTerm);
  };
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          ...textFieldProps.textField,
          width: textFieldProps.searchTextFieldWidth,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                color: palette.grey[500],
                "& .MuiTypography-root": { color: palette.grey[500] },
              }}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </>
  );
};

export default SearchTextField;
