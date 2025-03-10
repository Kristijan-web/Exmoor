import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import HeaderProvider from "./contexts/GlobalContexts/HeaderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeaderProvider>
      <App />
    </HeaderProvider>
  </StrictMode>,
);
