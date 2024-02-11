import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Box, Button, Stack } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { editUserData, profileApi } from "../../../lib/api/profileApi";
import Loader from "../../../loader/Loader";
import { useNavigate } from "react-router-dom";
import { placeHolderImage } from "../../../../constant/gerneral.constant";
import axios from "axios";
import { useSelector } from "react-redux";
const EditProfile = () => {
  const navigate = useNavigate();

  //!react -redux
  const { mode } = useSelector((state) => state.darkMode);

  //!creating localurl for image
  const [loaclUrl, setlocalUrl] = useState(null);

  //!hosting image in a server like cloudinary
  const [imageUrl, setimageUrl] = useState(null);
  //!=====user data through react Query========

  const { data, isLoading: dataLoading } = useQuery({
    queryKey: ["Profile-data-edit"],
    queryFn: () => profileApi(),
  });
  const userData = data?.data;

  //!=======editing user data through mutaion ======

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationKey: ["edit-user-data"],
    mutationFn: (values) => editUserData(userData._id, values),
    onSuccess: () => {
      navigate("/home");
    },
  });

  if (dataLoading || mutateLoading) {
    return <Loader />;
  }
  return (
    <Formik
      initialValues={{
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        location: userData?.location,
        occupation: userData?.occupation,
        bio: userData?.bio,
        fbLinks: userData?.fbLinks,
        instaLinks: userData?.instaLinks,
        linkedLinks: userData?.linkedLinks,
        youtubeLinks: userData?.youtubeLinks,
        githubLinks: userData?.githubLinks,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        location: Yup.string().required("Location is Requried"),
        occupation: Yup.string().required("Occupation is requried"),
        bio: Yup.string(),
        fbLinks: Yup.string(),
        instaLinks: Yup.string(),
        linkedLinks: Yup.string(),
        youtubeLinks: Yup.string(),
        githubLinks: Yup.string(),
      })}
      onSubmit={async (values) => {
        let pictureUrl = "";
        if (imageUrl) {
          const cloudName = "diwtmwthg";
          // creates form data object
          const data = new FormData();
          data.append("file", imageUrl);
          data.append("upload_preset", "hermes-mart");
          data.append("cloud_name", cloudName);

          try {
            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              data
            );

            pictureUrl = res.data.secure_url;
          } catch (error) {
            alert(error.message);
          }
        }

        if (pictureUrl) {
          values.pictureUrl = pictureUrl;
        }

        mutate(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="register-form">
          <div className="register-form-parent" id={mode ? "darkModeCard" : ""}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h1 style={{ color: "#F4CE14" }}>Social-Network</h1>
              <h2 id={mode ? "darkModeCard" : ""}>Edit Profile</h2>
            </div>
            {/* //!pictureUrl  */}

            <div style={{ marginTop: "1rem" }}>
              {/* image ===============  */}

              <img
                src={loaclUrl || userData?.pictureUrl || placeHolderImage}
                width={150}
                height={150}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />

              <Box sx={{ marginBottom: "1rem" }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button
                    variant={mode ? "contained" : "outlined"}
                    component="label"
                  >
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(event) => {
                        const imageUrl = event.target.files[0];
                        setlocalUrl(URL.createObjectURL(imageUrl));
                        setimageUrl(imageUrl);
                      }}
                    />
                  </Button>
                </Stack>
              </Box>
            </div>

            {/* //!firstName */}
            <div
              className="register-form-child register-FirstName-LastName"
              style={{ display: "flex", gap: "1rem" }}
            >
              <TextField
                label="FirstName"
                variant="filled"
                style={{ background: "#F6F1F1" }}
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error-msg">{formik.errors.firstName}</div>
              ) : null}

              {/* //!lastName */}
              <TextField
                label="LastName"
                variant="filled"
                style={{ background: "#F6F1F1" }}
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error-msg">{formik.errors.lastName}</div>
              ) : null}
            </div>

            {/* <div className="register-form-child"></div> */}

            {/* //!Email  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Email"
                variant="filled"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-msg">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* //!bio*/}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Bio"
                variant="filled"
                {...formik.getFieldProps("bio")}
              />
              {formik.touched.bio && formik.errors.bio ? (
                <div className="error-msg">{formik.errors.bio}</div>
              ) : null}
            </div>

            {/* //!location  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Location"
                variant="filled"
                type="location"
                {...formik.getFieldProps("location")}
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="error-msg">{formik.errors.location}</div>
              ) : null}
            </div>

            {/* //!occupation  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Occupation"
                variant="filled"
                type="occupation"
                {...formik.getFieldProps("occupation")}
              />
              {formik.touched.occupation && formik.errors.occupation ? (
                <div className="error-msg">{formik.errors.occupation}</div>
              ) : null}
            </div>

            {/* //!Links  of social-media*/}
            <h2 style={{ color: "#45474B" }}>Social-media Links</h2>
            {/* //?fb  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label=" FaceBook"
                variant="filled"
                // type="occupation"
                {...formik.getFieldProps("fbLinks")}
              />
              {formik.touched.fbLinks && formik.errors.fbLinks ? (
                <div className="error-msg">{formik.errors.fbLinks}</div>
              ) : null}
            </div>

            {/* //?instagram  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Instagram"
                variant="filled"
                {...formik.getFieldProps("instaLinks")}
              />
              {formik.touched.instaLinks && formik.errors.instaLinks ? (
                <div className="error-msg">{formik.errors.instaLinks}</div>
              ) : null}
            </div>

            {/* //?Linkined  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Linked"
                variant="filled"
                {...formik.getFieldProps("linkedLinks")}
              />
              {formik.touched.linkedLinks && formik.errors.linkedLinks ? (
                <div className="error-msg">{formik.errors.linkedLinks}</div>
              ) : null}
            </div>
            {/* //?Github  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Github"
                variant="filled"
                {...formik.getFieldProps("githubLinks")}
              />
              {formik.touched.githubLinks && formik.errors.githubLinks ? (
                <div className="error-msg">{formik.errors.githubLinks}</div>
              ) : null}
            </div>

            {/* //?Youtube  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%", background: "#F6F1F1" }}
                label="Youtube"
                variant="filled"
                {...formik.getFieldProps("githubLinks")}
              />
              {formik.touched.youtubeLinks && formik.errors.youtubeLinks ? (
                <div className="error-msg">{formik.errors.youtubeLinks}</div>
              ) : null}
            </div>
            {/* //!button  */}
            <Button type="submit" variant="contained">
              Edit Profile
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditProfile;
