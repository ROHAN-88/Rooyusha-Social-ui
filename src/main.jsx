import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GuestRoutes from "./routes/GuestRoutes.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainRoutes from "./routes/MainRoutes";
import store from "./store/store.js";
import { Provider } from "react-redux";
//!React- Routes
const appicationRoutes = [...GuestRoutes, ...MainRoutes];
const router = createBrowserRouter(appicationRoutes);

//!React - Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
