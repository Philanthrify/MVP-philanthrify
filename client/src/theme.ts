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
    700: "#A4A6AD",
    800: "#383B46",
    900: "#242427",
  },
  primary: {
    // light green
    100: "#EAF7ED",
    200: "#C0E6CA",
    300: "#97D4A9",
    400: "#6FC28B",
    500: "#49AE6F",
    600: "#209958",
    700: "#09864A",
    800: "#006F33",
    900: "#005927",
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
    figma: "#394056",
    lighter: "#36363e",
    light: "#222532",
    main: "#15161E",
    dark: "#161821",
  },

  //input: {
  //  figma: "#394056",
  //  hover: "#4C5572",
  //  activ: "#4C5572",
  //}, I tried here to add input field color but doesn't work

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
      color: tokens.grey[700],
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
      color: tokens.grey[700],
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
    // // Fergus: added these to style every textfield appwide
    // MuiTextField: {
    //   styleOverrides: {
    //     // Name of the slot
    //     // root: { height: "55px" },
    //     icon: {
    //       fill: "#ABAEBB",
    //     },
    //   },
    // },
    // applies to outline of each input thing (e.g. textfield, select, autocorrect)
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: "55px",
          borderRadius: "1.63rem", // Set the border radius here

          paddingLeft: "10px",

          "& .MuiOutlinedInput-notchedOutline": {
            border: "1.25px solid",
            borderColor: "#686E82",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solid",
            backgroundColor: "rgba(104, 110, 130, 0.1)",
            borderColor: "#ABB3CE",
          },

          "& .MuiInputBase-input": {
            color: "#FFFFFF",
            "&:-webkit-autofill": {
              WebkitTextFillColor: tokens.grey[500],
              WebkitBoxShadow: "0 0 0px 1000px white inset",
            },
          },

          "&:focus-within .MuiOutlinedInput-notchedOutline": {
            borderColor: "#09864A", // Change border color when any descendant receives focus
            backgroundColor: "rgba(104, 110, 130, 0.1)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // Name of the slot
        root: {},
        icon: {
          fill: "#ABAEBB",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginLeft: "10px",
          color: "#",

          // '&:hover': {
          //   color: 'white', // Color change on hover doesn't work for some reason
          //   marginLeft: '100px',
          // },
        },
        icon: {
          fill: "#ABAEBB",
        },
      },
    },

    MuiPlaceholder: {
      styleOverrides: {
        root: {
          //padding: '20px 20px 20px 20px',
          // '&:hover': {
          //   color: 'white', // Color change on hover doesn't work for some reason
          //   marginLeft: '100px',
          // },
        },
        icon: {
          fill: "#ABAEBB",
        },
      },
    },

    MuiSvgIcon: { styleOverrides: { root: { color: "#ABAEBB" } } }, // MUI icons are white unless overridden

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: tokens.grey[800],
          borderRadius: "10rem",
          "&:hover .MuiCheckbox:": {
            color: "#09864A",
          },
        },
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
