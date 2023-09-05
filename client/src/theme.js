// color design tokens export
export const tokens = {
  primary: {
    // black-grey-white-bluishpurple
    100: "#000000", // light-text
    200: "#fefefe",  // light-bg
    300: '#ffffff', // dark-text
    400: "#292e43"  // dark-bg
  },
  secondary: {
    // white-black
    100: "#EBF4F1",
    200: "#080808"
  },
  status: {
    // dark-light
    100: "#0000009b", // light-active-Nav-bg
    200: "#ffffff4b", // dark-active-Nav-bg
    // green
    300: "#C4FADA",
    400: "#3A9E5E",
    // red
    500: "#FED2CF",
    600: "#D55D61"
  },
  alt: {
    // brown-ceron
    100:'#F4CF9B',
    200:'#8E6D76'
  }
}

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: tokens.primary[300],
              bg: tokens.primary[400]
            },
            secondary: {
              main: tokens.secondary[100],
              alt: tokens.secondary[200],
            },
            active: {
              nav: tokens.status[200],
              main: tokens.status[300],
              alt: tokens.status[400],
            },
            inactive: {
              main: tokens.status[300],
              alt: tokens.status[400],
            },
            alternative: {
              one: tokens.alt[100],
              two: tokens.alt[200]
            }
          }
        : {
            // palette values for light mode
            primary: {
              main: tokens.primary[100],
              bg: tokens.primary[200]
            },
            secondary: {
              main: tokens.secondary[100],
              alt: tokens.secondary[200],
            },
            active: {
              nav: tokens.status[100],
              main: tokens.status[500],
              alt: tokens.status[600],
            },
            inactive: {
              main: tokens.status[300],
              alt: tokens.status[400],
            },
            alternative: {
              one: tokens.alt[100],
              two: tokens.alt[200]
            }
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        // fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        // fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        // fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        // fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        // fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        // fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    spacing: 1
  }
}