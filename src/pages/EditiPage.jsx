import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPostById } from "../lib/api/blog.Api";
import Loader from "../loader/Loader";
const EditiPage = () => {
  //!=-=========navigation==========
  const navigation = useNavigate();

  //!=====calling Params ======\
  const params = useParams();
  const postId = params.id;
  //!creating localurl for image
  const [loaclUrl, setlocalUrl] = useState(null);

  //!hosting image in a server like cloudinary
  const [productImages, setProductImages] = useState(null);

  //!=============query========
  const { data, isLoading: dataLoading } = useQuery({
    queryKey: ["post-Detail-id"],
    queryFn: () => getPostById([postId]),
  });

  const postDetail = data?.data;

  //!====mutation for vreating post======
  const queryClient = useQueryClient();

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationKey: ["Edit-post"],
    mutationFn: (values) => editPost(postId, values),
    onSuccess: () => {
      navigation("/home");
    },
  });

  if (dataLoading || mutateLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: "2rem",
        }}
      >
        <p></p>
        <h4>Edit Post</h4>

        <Button variant="contained" onClick={() => navigation("/home")}>
          Go Back to Home
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "650px",
        }}
      >
        <Formik
          initialValues={{
            text: postDetail?.text,
            imageUrl: postDetail?.imageUrl,
          }}
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
                alert(error.message);
              }
            }

            if (imageUrl) {
              values.imageUrl = imageUrl;
            }

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
                  sx={{
                    width: "30rem",
                  }}
                  {...formik.getFieldProps("text")}
                />

                {formik.touched.text && formik.errors.text ? (
                  <div>{formik.errors.text}</div>
                ) : null}

                <div style={{ marginTop: "1rem" }}>
                  {/* image ===============  */}

                  <img
                    src={loaclUrl || postDetail?.imageUrl}
                    width={350}
                    height={250}
                    style={{ objectFit: "cover" }}
                  />

                  <Box sx={{ marginBottom: "1rem" }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Button variant="outlined" component="label">
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
              <Button
                type="submit"
                variant="contained"
                disabled={mutateLoading}
              >
                Edit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default EditiPage;
