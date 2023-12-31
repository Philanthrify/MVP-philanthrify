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
    100: "#d0fcf4",
    200: "#a0f9e9",
    300: "#71f5de",
    400: "#41f2d3",
    500: "#12efc8",
    600: "#0ebfa0",
    700: "#0b8f78",
    800: "#076050",
    900: "#043028",
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
    main: "#1f2026",
  },
  white: {
    light: "#ffffff",
    middle: "#94969c",
  },
};

// mui theme settings
const themeSettings = {
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
    },
    white: {
      ...tokens.white,
      main: tokens.white.light,
    },
  },
  typography: {
    fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    fontSize: 13,
    weight: 400,
    color: tokens.grey[500],

    // Main title of page (e.g. project name on xproject page or 'explore' on explore page)
    h1: {
      fontSize: 48,
      fontWeight: 500,
      color: tokens.grey[500],
    },
    // underMainTitle (e.g. the text under the 'explore' on the explore page)
    h2: {
      fontSize: 24,
    },
    // lowerTitle (e.g.'challenge' in project page)
    h3: {
      fontSize: 18,
      fontWeight: 500,
      lineHeight: "28px",
      color: tokens.grey[200],
    },

    h4: {
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    // mainText (e.g. section writings fo on project page)
    h5: {
      fontSize: 16,
      fontWeight: 400,
      color: tokens.grey[500],
      lineHeight: "24px",
    },
    // lowerMainText - stuff a bit smaller than the mainText (e.g. on project page the tags and the targetAmount on sideFloater)
    // TODO: for this one color varies a bit more so set lower
    h6: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "20px",
      color: tokens.grey[700],
    },
  },
  // place for setting global themes for buttons
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {},
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          minWidth: "100px",
          height: "55px",
          fontSize: 16,
          textTransform: "none",
          fontWeight: 500,
          lineHeight: "24px",
          borderRadius: "var(--radius-full, 1000px)",
        },
      },
    },
  },
};

export { themeSettings };
