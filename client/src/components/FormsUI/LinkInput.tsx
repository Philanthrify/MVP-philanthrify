import FormStyles from "@/components/FormsUI";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

export interface Link {
  id: string;
  webLink: string;
  socialMedia: string;
}

interface LinkInputProps {
  id: string;
  webLink: string;
  socialMedia: string;
  onChange: (updatedLink: Link) => void;
  onDelete: (linkToDelete: Link) => void;
}
const LinkInput: React.FC<LinkInputProps> = ({
  id,
  webLink,
  socialMedia,
  onChange,
  onDelete,
}) => {
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
                webLink: webLink,
                socialMedia: e.target.value as string,
              })
            }
            sx={{ textAlign: "left" }}
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
          value={webLink}
          onChange={(e) =>
            onChange({ id, webLink: e.target.value, socialMedia })
          }
          label="Link"
          classes={{ ...textFieldProps.selectClasses  }}
          
        />
      </Grid>
      <Grid item xs={1}>
        <Button onClick={() => onDelete({ id, webLink, socialMedia })}>
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

export default LinkInput;
