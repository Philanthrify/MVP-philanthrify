import { Grid, Typography } from "@mui/material";

type SectionTextProps = {
  text: string;
};
const SectionText = (props: SectionTextProps) => {
  return (
    <Grid container direction="column" alignItems="flex-start" width="95%">
      <Grid item>
        <Typography variant="body2" sx={{ color: "white" }}>
          {props.text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SectionText;
