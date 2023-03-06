import React from "react";
import { Provider } from "./context/Context";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "@reach/router";
import SignInUp from "./screens/sign-in-up/SignInUp";
import WelcomeWizard from "./screens/welcome/WelcomeWizard";
import MainPages from "./screens/main-page/MainPages";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200EE",
    },
    secondary: {
      main: "#03DAC5",
    },
  },
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        "&$selected": {
          color: "#03DAC5",
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "none",
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <SignInUp whichPage="signIn" path="/" />
            <SignInUp whichPage="signUp" path="/signup" />
            <WelcomeWizard path="/welcome" />
            <MainPages path="/main" />
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
