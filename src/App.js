import axios from "axios";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import "./App.css";
import AppRouter from "./AppRouter";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(","),
    color: "#ddd",
    h4: {
      fontSize: "1.6rem",
      // fontWeight: 500
    },
  },
  palette: {
    primary: {
      main: "#29335C",
    },
    secondary: {
      main: purple[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
