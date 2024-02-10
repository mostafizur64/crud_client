import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Route/Route.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />{" "}
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);
