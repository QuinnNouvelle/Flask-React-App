import { PaletteMode } from "@mui/material";
import { blue, red, amber, grey, deepOrange } from "@mui/material/colors";
import React from "react";

const theme = {
    palette: {
      primary: amber
    },
};

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === "light"
          ? {
              // palette values for light mode
              primary: amber,
              divider: amber[200],
              background: {
                default: "#f3f3f3"
              },
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
              action: {
                hover: "#e6e6e6"
              }
            }
          : {
              // palette values for dark mode
              primary: {
                main: '#90caf9'
              },
              background: {
                default: '#2a3447',
                paper: "#1f1f1f",
              },
              text: {
                primary: "#fff",
                secondary: '#fff',
              },
              action: {
                hover: "#353535"
              }
            }),
      },
    });
  
export default theme;