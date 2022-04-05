import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRouter from "./MainRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <MainRouter />
    </React.StrictMode>
);
