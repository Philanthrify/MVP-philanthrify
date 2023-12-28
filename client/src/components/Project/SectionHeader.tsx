import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import TypographyTitle from "../Title";
import { Divider, Grid, Typography, useTheme } from "@mui/material";

type SectionHeaderProps = {
  header: string;
};
const SectionHeader = (props: SectionHeaderProps) => {
  const { palette } = useTheme();
  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item>
        <TypographyTitle variant="h1" align="center" padding="15px 0">
          {props.header}
        </TypographyTitle>
      </Grid>
      <Divider sx={{ borderColor: palette.white.middle, width: "100%" }} />
    </Grid>
  );
};

export default SectionHeader;
