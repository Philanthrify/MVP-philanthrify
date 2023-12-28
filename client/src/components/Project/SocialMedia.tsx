import { Grid } from "@mui/material";
import React from "react";
import Facebook from "../Icons/Links/Facebook";
import { Twitter } from "@mui/icons-material";
import Instagram from "../Icons/Links/Instagram";
import LinkedIn from "../Icons/Links/LinkedIn";

const Links = () => {
  return (
    <>
      <Grid container direction="row" spacing={4}>
        <Grid item>
          <Facebook />
        </Grid>
        <Grid item>
          <Twitter />
        </Grid>
        <Grid item>
          {" "}
          <Instagram />
        </Grid>
        <Grid item>
          {" "}
          <LinkedIn />
        </Grid>
      </Grid>
    </>
  );
};

export default Links;
