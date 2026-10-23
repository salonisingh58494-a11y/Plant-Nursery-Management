import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Plant-Nursery-Management">
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
