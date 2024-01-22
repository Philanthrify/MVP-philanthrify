import { ThemeOptions } from "@mui/material/styles";

import React from "react";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    white: React.CSSProperties["color"];
  }
}
