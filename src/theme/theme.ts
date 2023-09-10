import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(252, 143, 20)",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTextField: {
      defaultProps: {
        className: "b-input",
      },
    },
  },
});
