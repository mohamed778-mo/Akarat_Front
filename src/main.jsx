import React from "react"; 
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Modal from "react-modal";
import "aos/dist/aos.css";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
    <App />
);