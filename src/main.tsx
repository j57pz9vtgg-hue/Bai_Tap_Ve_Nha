import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AccessGate } from "./AccessGate";
import { LearningThemeProvider } from "./theme";
import "./dialogs.css";
import "./pixel.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LearningThemeProvider>
      <AccessGate>
        <App />
      </AccessGate>
    </LearningThemeProvider>
  </React.StrictMode>,
);

import "./paper.css";

import "./themes.css";

import "./topics.css";


import "./toys.css";

import "./arctic.css";
