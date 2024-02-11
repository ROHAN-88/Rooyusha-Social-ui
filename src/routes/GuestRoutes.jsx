import React from "react";
import LoginSign from "../pages/LoginSign";
import Register from "../component/Login-SignUp/Register";
import Login from "../component/Login-SignUp/Login";
import GuestGuard from "../Guard/GuestGuard";

const GuestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <LoginSign />
      </GuestGuard>
    ),
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default GuestRoutes;
