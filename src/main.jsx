import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MovieProvider } from "./context/MovieContext";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <MovieProvider>
        <App />
      </MovieProvider>
    </HashRouter>
  </StrictMode>
);
