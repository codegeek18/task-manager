import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if(process.env.NODE_ENV === 'production') disableReactDevTools();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);
