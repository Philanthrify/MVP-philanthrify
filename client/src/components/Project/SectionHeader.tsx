import { Divider, Grid } from "@mui/material";
import TypographyTitle from "../Title";

type SectionHeaderProps = {
  header: string;
  buttons?: React.ReactNode[];
};
const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        sx={{ width: "95%" }}
      >
        <Grid item>
          <TypographyTitle
            variant="h3"
            align="center"
            sx={{ marginBottom: "15px", marginTop: "35px" }}
          >
            {props.header}
          </TypographyTitle>
        </Grid>
        {/* DESIGN NOTE: Buttons are looking a bit far to the right, even going past divider */}

        {props.buttons && (
          <Grid
            item
            container
            direction="row"
            spacing={2}
            sm={6}
            justifyContent="flex-end"
            alignItems="flex-end"
            // sx={{ marginBottom: "15px", marginTop: "35px" }}
          >
            {props.buttons.map((button, index) => (
              <Grid
                item
                key={index}
                direction="column"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ marginBottom: "15px" }}
              >
                {button}
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <Divider sx={{ borderColor: "#383B46", width: "95%" }} />
      </Grid>
    </Grid>
  );
};

export default SectionHeader;
