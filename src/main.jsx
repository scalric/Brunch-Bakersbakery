import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { LocationProvider } from "@/context/LocationContext";
import "@/styles/main.css";
import "@/styles/header.css";
import "@/styles/pages.css";
import "@/styles/hero.css";
import "@/styles/home.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocationProvider>
      <ToastProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </LocationProvider>
  </StrictMode>
);
