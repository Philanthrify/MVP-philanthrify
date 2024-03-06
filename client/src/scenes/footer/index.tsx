import PrimaryButton from "@/components/Button/PrimaryButton";
import FormStyles from "@/components/FormsUI";
import PhilanthrifyLogoWithText from "@/components/Icons/PhilanthrifyLogoWithText";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";

const Footer = () => {
  const { palette } = useTheme();
  const theme = useTheme();
  const textFieldProps = FormStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ isMobile:", isMobile);
  }, [isMobile]);

  return (
    <>

<div>
      {isMobile ? (
        <footer />
      ) : (
        <Grid
          container
          //direction="row"
          //spacing={2}
          //justifyContent={includeLogo ? "space-between" : "flex-start"}
          alignItems="center"
          sx={{
            //marginTop: "8px",
            //backgroundColor: "red",
            //marginBottom: "15px",
            //width: "100%", // Set width to 85% of the parent
            //marginLeft: "auto", // Center the element
            //marginRight: "auto",
          }}
        >
          
        </Grid>
      )}
    </div>

      <Grid
        container
        direction="column"
        justifyContent="center"
        //alignItems="center"
        spacing={4}
        alignItems={isMobile ? "flex-start" : "center"} // Adjust alignment based on screen size

        sx={{ paddingBottom: "20px" }} // Add bottom padding here

      >
        <Grid item sx={{ width: isMobile ? "100%" : "85%", }}>
          <Divider sx={{ borderColor: palette.grey[800], marginBottom: "25px",  }} />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          
          sx={{ width: isMobile ? "100%" : "85%", }}
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
              <Typography variant="body1" sx={{ fontStyle: "italic", marginTop: "5px", }}>
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
            spacing={1}
            
          >
            <Grid item container   
            justifyContent={isMobile ? "left" : "left"}
 width="450px"         
            
            sx={{
              alignItems: isMobile ? "center" : "left",
              textAlign: isMobile ? "center" : "left",
              width: isMobile ? "100%" : "450px",
            }}
>
              {" "}
              <Typography variant="body1" sx={{ color: palette.white.light, fontWeight: 500, fontSize: 14, marginTop: isMobile ? "60px" : "0px", textAlign: isMobile ? "left" : "center", marginBottom: "12px",  }}>
                Stay up to date
              </Typography>
            </Grid>
            <Grid item container justifyContent="flex-end" spacing={4}>
              <Grid item style={{ width: isMobile ? "60%" : "320px", }}>
                {" "}
                <TextField
                  fullWidth
                  label="Enter your email"
                  
                />{" "}
              </Grid>{" "}
              <Grid item>
                {" "}
                <PrimaryButton
                  text="Subscribe"
                  
            onClick={() => {
              //dispatch(setNavbarSelected("donate"));

              console.log("");
            }}
                  
                  />
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>{" "}
        <Grid item sx={{ width: isMobile ? "100%" : "85%", }}>
          <Divider sx={{ borderColor: palette.grey[800], marginTop: "25px", }} />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: isMobile ? "100%" : "85%", }}
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            //marginBottom: isMobile ? "320px" : "320px",
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
              <Typography variant="body1" >Cookies </Typography>
            </Grid>

            

          </Grid>{" "}
          <Grid item container direction="row" justifyContent="flex-end" md={6} sx={{ marginTop: isMobile ? "40px" : "0px", }} // Add margin top of 50px when on mobile
 >
            <Grid item>
              <Typography variant="body1" >
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
