import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
    if (!isLoggedIn && pathname === "/") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return props.children;
};

export default GuestGuard;
