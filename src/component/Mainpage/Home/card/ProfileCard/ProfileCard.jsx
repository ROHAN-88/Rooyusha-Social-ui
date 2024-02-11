import React from "react";
import "./profileCard.css";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import { profileApi } from "../../../../../lib/api/profileApi";
import { placeHolderImage } from "../../../../../../constant/gerneral.constant";
import { useSelector } from "react-redux";
import "../BlogCard/BlogCard.css";
const ProfileCard = () => {
  const { data } = useQuery({
    queryKey: ["profile-card"],
    queryFn: () => profileApi(),
  });
  const userData = data?.data;
  //!react -redux
  const { mode } = useSelector((state) => state.darkMode);
  return (
    <div className="wrapper">
      <div
        className="profile-card js-profile-card"
        id={mode ? "darkModeCard" : ""}
      >
        <div className="profile-card__img">
          <img src={userData?.pictureUrl || placeHolderImage} />
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">
            <h3>{userData?.firstName + " " + userData?.lastName} </h3>
          </div>
          <div className="profile-card__txt" id={mode ? "darkModeCard" : ""}>
            <h4>{userData?.occupation}</h4>{" "}
          </div>
          <div className="profile-card-loc">
            <span className="profile-card-loc__txt">
              Location: {userData?.location}
            </span>
          </div>
        </div>
        {/* <div>
          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "1rem" }}
          >
            Edit
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
