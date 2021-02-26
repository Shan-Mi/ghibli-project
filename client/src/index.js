import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "antd/dist/antd.css";
import App from "./App";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <GlobalContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
