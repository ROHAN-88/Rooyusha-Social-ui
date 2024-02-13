import { Box, Button, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { placeHolderImage } from "../../../../../../constant/gerneral.constant";
import { creatPost } from "../../../../../lib/api/blog.Api";
import Loader from "../../../../../loader/Loader";
import "./inputCard.css";
const InputCard = () => {
  //!Image type useState to change bwtween vid and img
  const [imageType, setImageType] = useState("Image");
  // console.log(imageType);
  //!react -redux
  const { mode } = useSelector((state) => state.darkMode);

  //!calling Query============
  const { data } = useQuery({
    queryKey: ["profile-card"],
    queryFn: () => profileApi(),
  });
  const userData = data?.data;

  //!creating localurl for image
  const [loaclUrl, setlocalUrl] = useState(null);

  //!hosting image in a server like cloudinary
  const [productImages, setProductImages] = useState(null);

  //!====mutation for vreating post======
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["Creat-post"],
    mutationFn: (values) => creatPost(values),
    onSuccess: () => {
      queryClient.invalidateQueries("get-Post");
      setlocalUrl(null);
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      className="input-card-parent"
      sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "flex",
        },
      }}
    >
      <div className="input-card-profile-image">
        <img src={userData?.pictureUrl || placeHolderImage} alt="" />
      </div>
      <div className="input-card-box">
        <Formik
          initialValues={{ text: "", imageType: "" }}
          validationSchema={Yup.object({
            text: Yup.string().required("Required"),
            imageType: Yup.string().oneOf(["Image", "Video"]),
          })}
          onSubmit={async (values) => {
            let imageUrl = "";
            if (productImages) {
              const cloudName = "diwtmwthg";
              // creates form data object
              const data = new FormData();
              data.append("file", productImages);
              // data.append("upload_preset", "hermes-mart");
              data.append(
                "upload_preset",
                imageType === "Image" ? "image_preset" : "video_preset"
              );
              data.append("cloud_name", cloudName);

              try {
                // const res = await axios.post(
                //   `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                //   data
                // );
                // ? for video
                const resourceType = imageType === "Image" ? "image" : "video";
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
                  data
                );

                imageUrl = res.data.secure_url;
              } catch (error) {
                console.log("Image uplaod", error);
                dispatch(openErrorSnackbar("Image upload failed."));
              }
            }

            values.imageUrl = imageUrl;

            mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <div>
                <TextField
                  // fullWidth
                  label="Blog"
                  style={{
                    width: "30rem",
                    background: "#F5F7F8",

                    borderRadius: "30px",
                  }}
                  {...formik.getFieldProps("text")}
                />

                {formik.touched.text && formik.errors.text ? (
                  <div>{formik.errors.text}</div>
                ) : null}

                <div style={{ marginTop: "1rem" }}>
                  {/* image ===============  */}
                  {imageType === "Image" && loaclUrl && (
                    <img
                      src={loaclUrl}
                      width={350}
                      height={250}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  {imageType === "Video" && loaclUrl && (
                    <video width={350} height={250} controls>
                      <source src={loaclUrl} />
                    </video>
                  )}
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Button
                        variant={mode ? "contained" : "outlined"}
                        component="label"
                      >
                        Upload Image
                        <input
                          hidden
                          accept="image/*,video/*"
                          multiple
                          type="file"
                          onChange={(event) => {
                            const productImage = event.target.files[0];
                            setlocalUrl(URL.createObjectURL(productImage));
                            setProductImages(productImage);
                          }}
                        />
                      </Button>
                      {/* //!Select the Image Type  */}
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Type
                          </InputLabel>
                          <Select
                            label="Type"
                            // onChange={handleChange}
                            {...formik.getFieldProps("imageType")}
                          >
                            <MenuItem
                              value={"Image"}
                              onClick={() => setImageType("Image")}
                            >
                              Image
                            </MenuItem>
                            <MenuItem
                              value={"Video"}
                              onClick={() => setImageType("Video")}
                            >
                              Video
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>

                    {/* //!Video  */}
                    {/* <Stack>
                      <Button>
                        <video src={} />
                      </Button>
                    </Stack> */}
                  </Box>
                </div>
              </div>
              <Button type="submit" variant="contained" disabled={isLoading}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Box>
  );
};

export default InputCard;
