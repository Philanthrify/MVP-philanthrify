import React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";
import FormStyles from "@/components/FormsUI";

export interface Link {
  id: string;
  link: string;
  socialMedia: string;
}

interface LinkInputProps {
  id: string;
  link: string;
  socialMedia: string;
  onChange: (updatedLink: Link) => void;
  onDelete: (linkToDelete: Link) => void;
}
const LinkInput: React.FC<LinkInputProps> = ({
  id,
  link,
  socialMedia,
  onChange,
  onDelete,
}) => {
  const { palette } = useTheme();
  const textFieldProps = FormStyles();
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={4}>
        <FormControl fullWidth>
          {/* <InputLabel
            sx={{
              "& .MuiInputLabel-outlined": {
                color: palette.grey.main,
              },
              color: palette.grey.main,
              paddingBottom: "20px",
            }}
          >
            Social Media
          </InputLabel> */}
          <Select
            name="socialMedia"
            value={socialMedia}
            onChange={(e) =>
              onChange({
                id: id,
                link: link,
                socialMedia: e.target.value as string,
              })
            }
            sx={{ ...textFieldProps.select, paddingY: "0px" }}
          >
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Youtube">Youtube</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
            <MenuItem value="Instagram">Instagram</MenuItem>
            {/* Add other social media options */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={7}>
        <TextField
          fullWidth
          name="link"
          value={link}
          onChange={(e) => onChange({ id, link: e.target.value, socialMedia })}
          label="Link"
          classes={{ ...textFieldProps.selectClasses }}
          sx={{ ...textFieldProps.textField }}
        />
      </Grid>
      <Grid item xs={1}>
        <Button onClick={() => onDelete({ id, link, socialMedia })}>
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

export default LinkInput;
