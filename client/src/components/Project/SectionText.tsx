import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import TypographyTitle from "../Title";
import { Divider, Grid, Typography, useTheme } from "@mui/material";

type SectionTextProps = {
  text: string;
};
const SectionText = (props: SectionTextProps) => {
  const { palette } = useTheme();
  return (
    <Grid container direction="column" alignItems="flex-start" width="90%">
      <Grid item>
        <Typography variant="h5" sx={{ color: "white" }}>
          {props.text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SectionText;
