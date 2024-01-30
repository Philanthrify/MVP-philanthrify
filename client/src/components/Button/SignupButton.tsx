import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Button, Checkbox, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

interface SignupButtonProps {
  selected: boolean;
  label: string;
  description: string;
  IconComponent: React.ElementType;
  onClick: () => void;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  selected,
  label,
  description,
  IconComponent,
  onClick,
}) => {
  const { palette } = useTheme();
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        borderRadius: "var(--radius-xl, 12px)",
        // backgroundColor: selected ? "primary.main" : "secondary.light",
        // "&:hover": {
        //   backgroundColor: selected ? "primary.dark" : "secondary.main",
        // }, //TODO: nice Hover effect

        backgroundColor: selected
          ? palette.background.figma
          : palette.background.figma,
        "&:hover": {
          backgroundColor: selected
            ? palette.background.figma
            : palette.background.figma,
        }, //TODO: nice Hover effect
        borderColor: selected ? palette.primary.main : palette.background.figma,
        borderWidth: "2px",
        // TODO: work out border when selected
        width: "100%",
        maxWidth: "360px", // don't want it bigger than this
        height: "auto",
        padding: "0 16px"
        // boxShadow: "none",
      }}
    >
      <Grid container rowSpacing={1} direction="row">
        {/* The icon is ringed by a circle */}
        <Grid container xs={2} item alignItems="center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "48px",
              height: "48px",
              backgroundColor: palette.primary.main,
              borderRadius: "50%",
            }}
          >
            <IconComponent />
          </div>
        </Grid>
        <Grid
          container
          item
          direction="column"
          xs={8}
          sx={{ maxWidth: "230px" }}
        >
          {" "}
          <Typography
            variant="subtitle1"
            component="div"
            color={palette.white.light}
          >
            {label}
          </Typography>
          <Typography variant="body2" color={palette.grey[500]}>
            {description}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          {" "}
          <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={
              <CheckCircleOutlineIcon sx={{ color: "primary.main" }} />
            }
            checked={selected}
          />
        </Grid>
      </Grid>
    </Button>
  );
};
export default SignupButton;
