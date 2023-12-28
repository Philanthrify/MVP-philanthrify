import { Grid, useTheme } from "@mui/material";

type ProgressBarProps = {
  required: number;
  fulfilled: number;
};
const ProgressBar = (props: ProgressBarProps) => {
  const { palette } = useTheme();

  const progress =
    props.fulfilled === 0 ? 0 : (props.required * 100) / props.fulfilled;

  const containerStyles = {
    height: 5,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: "1rem",
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: palette.primary.main,
    borderRadius: "inherit",
    textAlign: "right" as const,
  };

  const labelStyles = {
    padding: 5,
    color: palette.white.light,
    fontWeight: "bold",
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
      sx={{ width: "100%" }}
    >
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}></span>
        </div>
      </div>
      <div style={labelStyles}>{`${progress.toFixed()}%`}</div>
    </Grid>
  );
};
export default ProgressBar;
