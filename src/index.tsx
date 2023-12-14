import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MainProvider } from "./context/main-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
);
