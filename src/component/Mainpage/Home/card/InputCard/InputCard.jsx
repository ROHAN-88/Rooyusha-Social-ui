import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import "./inputCard.css";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { creatPost } from "../../../../../lib/api/blog.Api";
import Loader from "../../../../../loader/Loader";
import { useSelector } from "react-redux";
import { placeHolderImage } from "../../../../../../constant/gerneral.constant";
const InputCard = () => {
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

      window.location.reload(false);
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
          initialValues={{ text: "" }}
          validationSchema={Yup.object({
            text: Yup.string().required("Required"),
          })}
          onSubmit={async (values) => {
            let imageUrl = "";
            if (productImages) {
              const cloudName = "diwtmwthg";
              // creates form data object
              const data = new FormData();
              data.append("file", productImages);
              data.append("upload_preset", "hermes-mart");
              data.append("cloud_name", cloudName);

              try {
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  data
                );

                imageUrl = res.data.secure_url;
              } catch (error) {
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
                  {loaclUrl && (
                    <img
                      src={loaclUrl}
                      width={350}
                      height={250}
                      style={{ objectFit: "cover" }}
                    />
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
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={(event) => {
                            const productImage = event.target.files[0];
                            setlocalUrl(URL.createObjectURL(productImage));
                            setProductImages(productImage);
                          }}
                        />
                      </Button>
                    </Stack>
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
