import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.styles.css";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
