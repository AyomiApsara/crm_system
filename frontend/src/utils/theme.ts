import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    background: {
      default: "#f3f4f6",
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;