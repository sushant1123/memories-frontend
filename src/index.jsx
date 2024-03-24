import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.styles.css";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

const container = document.getElementById("root");
const theme = createTheme();

const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StyledEngineProvider>
  </ThemeProvider>
);
