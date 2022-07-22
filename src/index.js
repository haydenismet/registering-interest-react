import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./containers/App.js";
import reportWebVitals from "./reportWebVitals";
import { RegistrationProvider } from "./components/context/RegistrationContext.context";

/* RegistrationProvider is context to provide regTwoInput globally between components */
ReactDOM.render(
  <RegistrationProvider>
    <App />
  </RegistrationProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
