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
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent={includeLogo ? "space-between" : "flex-start"}
        alignItems="center"
        sx={{
          marginTop: "8px",
          marginBottom: "15px",
          width: "85%", // Set width to 85% of the parent
          marginLeft: "auto", // Center the element
          marginRight: "auto",
        }}
      >
        <LeftSide selected={selected} setSelected={setSelected} />
        <RightSide setSelected={setSelected} />
      </Grid>
      {/* </Box> */}
    </div>
  );
};

export default Navbar;
