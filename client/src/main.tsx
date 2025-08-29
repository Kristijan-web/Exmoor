import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import HeaderProvider from "./contexts/GlobalContexts/HeaderContext.tsx";
import CartProvider from "./contexts/GlobalContexts/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </CartProvider>
  </StrictMode>,
);
