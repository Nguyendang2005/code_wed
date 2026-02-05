import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Products from "../pages/Products/Products.jsx";
import Suppliers from "../pages/Suppliers/Suppliers.jsx";
import Inventory from "../pages/Inventory/Inventory.jsx";
import Orders from "../pages/Orders/Orders.jsx";
import Customers from "../pages/Customers/Customers.jsx";
import Forecast from "../pages/ForeCast/Forecast.jsx";
import Chatbot from "../pages/Chatbot/Chatbot.jsx";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: (
      <Protected>
        <MainLayout />
      </Protected>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: "/suppliers", element: <Suppliers /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/orders", element: <Orders /> },
      { path: "/customers", element: <Customers /> },
      { path: "/forecast", element: <Forecast /> },
      { path: "/chatbot", element: <Chatbot /> },
    ],
  },
]);
