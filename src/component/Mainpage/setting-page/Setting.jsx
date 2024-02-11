import { Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../../store/darkThemeSlice";
import { useNavigate } from "react-router-dom";
const Setting = () => {
  //? navigation=============
  const navigation = useNavigate();

  //!react -redux
  const { mode } = useSelector((state) => state.darkMode);

  const dispactch = useDispatch();
  return (
    <div style={{ height: "93vh", marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>Dark Mode</h3>
        <Button
          onClick={() => dispactch(toggleDarkMode())}
          variant="contained"
          sx={{ width: "5rem", height: "3rem", marginBottom: "2rem" }}
        >
          {mode ? "OFF" : "ON"}
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>Edit Profile</h3>
        <Button
          variant="contained"
          onClick={() => navigation("/EditUserProfile")}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Setting;
