import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./main.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>
);

reportWebVitals();
