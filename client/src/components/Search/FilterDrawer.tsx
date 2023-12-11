import { Box, Divider, Drawer, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

type FilterDrawerProps = {
  drawerOpen: boolean;
  setDrawerOpen: (arg0: boolean) => void;
};

const FilterDrawer = (props: FilterDrawerProps) => {
  const { palette } = useTheme();

  return (
    <Drawer
      anchor="left"
      open={props.drawerOpen}
      onClose={() => props.setDrawerOpen(false)}
    >
      <Box
        p={2}
        width="250px"
        textAlign="center"
        role="presentation"
        sx={{
          backgroundColor: "#2C2C2E", // This is the color of the background in the photo
          height: "100%",
        }}
      >
        <Typography variant="h3" component="div" sx={{ color: "white" }}>
          Filters
        </Typography>
        <Divider sx={{ borderColor: palette.white.middle, marginY: 2 }} />
        {/* Divider styled with white color */}
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
