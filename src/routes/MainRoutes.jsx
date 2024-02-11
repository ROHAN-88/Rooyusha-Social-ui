import React from "react";
import Home from "../component/Mainpage/Home/Home";
import ProfilePage from "../component/Mainpage/Profilepage/ProfilePage";
import MainLayout from "../component/Mainpage/MainLayout";
import AuthGuard from "../Guard/AuthGuard";
import EditiPage from "../pages/EditiPage";
import Setting from "../component/Mainpage/setting-page/Setting";
import EditProfile from "../component/Mainpage/Profilepage/EditProfile";

const MainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "EditPost/:id",
        element: <EditiPage />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "EditUserProfile",
        element: <EditProfile />,
      },
    ],
  },
];

export default MainRoutes;
