import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";

const MainLayout = () => {
  //!react -redux
  const { mode } = useSelector((state) => state.darkMode);
  return (
    <div className={mode ? "darkMode" : "lightMode"}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
