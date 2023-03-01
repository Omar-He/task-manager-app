import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#109ee6",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
  },
});
