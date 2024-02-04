import { Divider, Grid, useTheme } from "@mui/material";
import TypographyTitle from "../Title";

type SectionHeaderProps = {
  header: string;
  buttons?: React.ReactNode[];
};
const SectionHeader = (props: SectionHeaderProps) => {
  const { palette } = useTheme();
  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item container direction="row" justifyContent="space-between">
        <Grid item>
          <TypographyTitle variant="h3" align="center" padding="15px 0">
            {props.header}
          </TypographyTitle>
        </Grid>
        <Grid item>
          {props.buttons && (
            <Grid item>
              <Grid container spacing={1}>
                {props.buttons.map((button, index) => (
                  <Grid item key={index}>
                    {button}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: palette.white.middle, width: "100%" }} />
    </Grid>
  );
};

export default SectionHeader;
