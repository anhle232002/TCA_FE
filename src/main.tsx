import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { queryClient } from "./lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
