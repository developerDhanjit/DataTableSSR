import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";

// PrimeReact CSS
import "primereact/resources/themes/md-dark-deeppurple/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

// Prime icons
import "primeicons/primeicons.css";

import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={{ appendTo: "self" }}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
