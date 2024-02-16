// Useful video for themes: https://www.youtube.com/watch?v=SUEkAOuQZTQ
// look into: mode (color mode)

export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    // light green
    100: "#B0EACE",
    200: "#A9E2C6",
    300: "#90D5B4",
    400: "#70CDA0",
    500: "#50C58D",
    600: "#2DAF70",
    700: "#099250",
    800: "#087742",
    900: "#016937",
  },
  secondary: {
    // yellow
    100: "#fcf0dd",
    200: "#fae1bb",
    300: "#f7d299",
    400: "#f5c377",
    500: "#f2b455",
    600: "#c29044",
    700: "#916c33",
    800: "#614822",
    900: "#302411",
  },
  tertiary: {
    // purple
    500: "#8884d8",
  },
  background: {
    figma: "#3B3B41",
    lighter: "#36363e",
    light: "#2d2d34",
    main: "#1A1A1E",
    dark: "#0F0F13",
  },
  white: {
    light: "#ffffff",
    middle: "#94969c",
  },
};

// mui theme settings
const themeSettings = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
      lighter: tokens.background.lighter,
      figma: tokens.background.figma,
      dark: tokens.background.dark,
    },
    white: {
      ...tokens.white,
      main: tokens.white.light,
    },
  },
  typography: {
    fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    fontSize: 13,
    weight: 500,
    color: tokens.grey[500],

    // Main title of page (e.g. project name on xproject page or 'explore' on explore page)
    h1: {
      fontSize: 48,
      fontWeight: 500,
      color: tokens.grey[100],
    },
    // underMainTitle (e.g. the text under the 'explore' on the explore page)
    h2: {
      fontSize: 38,
      fontWeight: 500,
      color: tokens.grey[500],
    },
    // lowerTitle (e.g.'challenge' in project page)
    h3: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: "30px",
      color: tokens.grey[100],
    },
    h4: {
      fontSize: 20,
      fontWeight: 300,
      lineHeight: "30px",
      color: tokens.grey[600],
    },
    // Bit title
    h5: {
      fontSize: 60,
      fontWeight: 700,
      lineHeight: "60px",
      letterSpacing: " -1.2px",
      color: tokens.white.light,
    },
    // e.g. Accordion headers
    h6: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "24px",
      color: tokens.white.light,
    },

    // Main body text - can be overwritten on the color
    body1: {
      fontSize: 14,
      // fontWeight: 600,
      lineHeight: "20px",
      color: tokens.grey[700],
    },
    // slightly bigger text, mostly darker
    body2: {
      fontSize: 16,
      fontWeight: 400,
      color: tokens.grey[600],
      lineHeight: "24px",
    },

    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "18px",
      color: tokens.grey[700],
    },
  },
  // place for setting global themes for buttons
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: tokens.background.dark,
        },
      },
    },
    ///// General components higher
    //// Buttons
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          minWidth: "100px",
          height: "55px",
          fontSize: 16,
          textTransform: "none" as const,
          fontWeight: 500,
          lineHeight: "24px",
          borderRadius: "var(--radius-full, 1000px)",
        },
      },
    },
    // Fergus: added these to style every textfield appwide
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.grey[500],
          },
          "& .MuiInputBase-input": {
            color: tokens.grey[500],
            "&:-webkit-autofill": {
              WebkitTextFillColor: tokens.grey[500],
              WebkitBoxShadow: "0 0 0px 1000px white inset",
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { color: tokens.grey[500], borderRadius: "1rem" },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: tokens.grey[800] },
      },
    },

    /////// Accordians:
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // Set Accordion background to transparent
          boxShadow: "none", // Remove any shadows
          "&:before": {
            display: "none", // Remove the pseudo-element used for the default border
          },
          "&.Mui-expanded": {
            margin: 0, // Remove the default margin applied when expanded
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          // Optional: Adjust the AccordionSummary as needed
          minHeight: "48px", // Example height, adjust as necessary
          "&.Mui-expanded": {
            minHeight: "48px", // Keep consistent height when expanded
          },
        },
        content: {
          margin: "0", // Remove the default vertical margins
          "&.Mui-expanded": {
            margin: "0", // Keep margins consistent when expanded
          },
        },
      },
    },
  },
};

export { themeSettings };
