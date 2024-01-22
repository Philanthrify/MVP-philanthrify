import { RootState } from "@/redux/store";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Grid, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

type LocationTextProps = {
  text: string;
};

// This component displays the country of the current project with an icon
//, if available.
const LocationText = (props: LocationTextProps) => {
  const project = useSelector((state: RootState) => state.project.project);
  const { palette } = useTheme();
  return (
    <>
      {project?.country && (
        <Grid container spacing={0.5} direction="row">
          <Grid item>
            <LocationOnOutlinedIcon sx={{ color: palette.primary.main }} />
          </Grid>
          <Grid item>
            <Typography variant="h6" color={palette.primary.main}>
              {props.text}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LocationText;
