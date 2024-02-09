import FormStyles from "@/components/FormsUI";
import PhilanthrifyLogoWithText from "@/components/Icons/PhilanthrifyLogoWithText";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

const Footer = () => {
  const { palette } = useTheme();
  const textFieldProps = FormStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ paddingBottom: "14px" }} // Add bottom padding here

      >
        <Grid item sx={{ width: "85%" }}>
          <Divider sx={{ borderColor: palette.grey[800] }} />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "85%" }}
        >
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            md={6}
          >
            <Grid item>
              <PhilanthrifyLogoWithText />
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                Helping transparent charity initiatives around the world
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            md={6}
            spacing={2}
          >
            <Grid item container justifyContent="flex-start" width="450px">
              {" "}
              <Typography variant="body1" sx={{ color: palette.white.light }}>
                Stay up to date
              </Typography>
            </Grid>
            <Grid item container justifyContent="flex-end" spacing={2}>
              <Grid item style={{ width: "350px" }}>
                {" "}
                <TextField
                  fullWidth
                  label="Input your email here..."
                  sx={{
                    ...textFieldProps.textField,
                  }}
                />{" "}
              </Grid>{" "}
              <Grid item>
                {" "}
                <Button
                  // variant="text"
                  sx={{
                    color: palette.background.default,
                    backgroundColor: palette.primary.main,
                    "&:hover": {
                      color: palette.background.default,
                      backgroundColor: palette.primary.main,
                    },
                    padding: "24px 24px", // Add padding left and right

                  }}
                >
                  Subscribe
                </Button>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>{" "}
        <Grid item sx={{ width: "85%" }}>
          <Divider sx={{ borderColor: palette.grey[800] }} />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "85%" }}
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            md={6}
            spacing={4}
          >
            <Grid item>
              <Typography variant="body1">
                © 2024 All rights reserved.{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Terms </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Privacy </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Cookies </Typography>
            </Grid>
          </Grid>{" "}
          <Grid item container direction="row" justifyContent="flex-end" md={6}>
            <Grid item>
              <Typography variant="body1">
                See any bugs? Our website is in it's early days. Email:
                fergusjcassidy@gmail.com to report a bug.{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
