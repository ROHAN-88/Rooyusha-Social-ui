import React from "react";
import "./profilePage.css";
import { useQuery } from "react-query";
import { profileApi, userPost } from "../../../lib/api/profileApi";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  //?====navigation======
  const naviagtion = useNavigate();

  //!react -redux
  const { mode } = useSelector((state) => state.darkMode);

  //?============query of profile================
  const { data } = useQuery({
    queryKey: ["profile-card-page"],
    queryFn: () => profileApi(),
  });
  const userData = data?.data;

  //?==============Query of post of user===========
  const { data: postData } = useQuery({
    queryKey: ["profile-page-userPost"],
    queryFn: () => userPost(),
  });
  const userPosts = postData?.data;
  return (
    <>
      <main>
        <div className="column-wrapper">
          <div className="left-col">
            <div id="profile-pic">
              <img src={userData?.pictureUrl} />
            </div>
          </div>
          <div className="right-col">
            <div className="user-id">
              <h2>{userData?.firstName + " " + userData?.lastName}</h2>
              <Button variant="contained" sx={{ marginLeft: "2rem" }}>
                follow
              </Button>
              <Button onClick={() => naviagtion("/EditUserProfile")}>
                Edit
              </Button>
              {/* <div id="dots">...</div> */}
            </div>
            <div className="stats">
              <a href="#">
                <span>100</span> posts
              </a>
              <a href="#">
                <span>1298</span> followers
              </a>
              <a href="#">
                <span>21</span> following
              </a>
            </div>
            <div>
              <h4 style={{ marginLeft: "3rem" }}>"{userData?.bio}"</h4>
            </div>
            <div className="bio">
              <div>
                <ul className="wrapper-profile-page">
                  {/* faceBook url  */}

                  {userData?.fbLinks != "" && (
                    <li
                      className="icon facebook"
                      id={mode ? "darkModeCard" : ""}
                    >
                      <a
                        href={userData?.fbLinks}
                        target="_blank"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <span className="tooltip">Facebook</span>
                        <span>
                          <i className="fab fa-facebook-f"></i>
                        </span>
                      </a>
                    </li>
                  )}

                  {/* twitter Url  */}

                  {userData?.linkedLinks != "" && (
                    <li
                      className="icon twitter"
                      id={mode ? "darkModeCard" : ""}
                    >
                      <span className="tooltip">Twitter</span>
                      <span>
                        <i className="fab fa-twitter"></i>
                      </span>
                    </li>
                  )}

                  {/* instagram url  */}
                  <li
                    className="icon instagram"
                    id={mode ? "darkModeCard" : ""}
                  >
                    <span className="tooltip">Instagram</span>
                    <span>
                      <i className="fab fa-instagram"></i>
                    </span>
                  </li>

                  {/* github url  */}
                  <li className="icon github" id={mode ? "darkModeCard" : ""}>
                    <a
                      href="https://github.com"
                      target="_blank"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <span className="tooltip">Github</span>
                      <span>
                        <i className="fab fa-github"></i>
                      </span>
                    </a>
                  </li>

                  {/* youtube url  */}
                  <li className="icon youtube" id={mode ? "darkModeCard" : ""}>
                    <a
                      href="https://github.com"
                      target="_blank"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <span className="tooltip">Youtube</span>
                      <span>
                        <i className="fab fa-youtube"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <article>
        {userPosts?.map((item) => {
          return (
            <div key={item._id}>
              <img src={item?.imageUrl} />
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ProfilePage;
