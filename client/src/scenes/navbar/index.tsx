import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";

const Navbar = () => {
  const [selected, setSelected] = useState<string>("explore");
  const includeLogo = useMediaQuery("@media (min-width: 745px)");

  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent={includeLogo ? "space-between" : "flex-start"}
        alignItems="center"
        sx={{ marginTop: "8px", marginBottom: "15px" }}
      >
        <LeftSide selected={selected} setSelected={setSelected} />
        <RightSide setSelected={setSelected} />
      </Grid>
      {/* </Box> */}
    </>
  );
};

export default Navbar;
