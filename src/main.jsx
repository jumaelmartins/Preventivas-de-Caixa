import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import { queryClient } from "./lib/tanstack-query.js";
import { QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);
