import { Divider, Grid, useTheme } from "@mui/material";
import TypographyTitle from "../Title";

type SectionHeaderProps = {
  header: string;
};
const SectionHeader = (props: SectionHeaderProps) => {
  const { palette } = useTheme();
  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item>
        <TypographyTitle variant="h3" align="center" padding="15px 0">
          {props.header}
        </TypographyTitle>
      </Grid>
      <Divider sx={{ borderColor: palette.white.middle, width: "100%" }} />
    </Grid>
  );
};

export default SectionHeader;
