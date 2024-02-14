// eslint-disable-next-line
// we import because we want to extend, not overwrite
import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
    middle: string;
    main: string;
    light: string;
  }
  interface Palette {
    tertiary: PaletteColor;
    white: PaletteColor;
    grey: PaletteColor;
  }
  interface TypeBackground {
    light: string;
    lighter: string;
    figma: string;
    dark: string;
  }
  interface Color {
    main: string;
  }
}
