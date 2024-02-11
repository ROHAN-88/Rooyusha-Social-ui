import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileCard from "./card/ProfileCard/ProfileCard";
import InputCard from "./card/InputCard/InputCard";
import BlogCard from "./card/BlogCard/BlogCard";
import { useQuery } from "react-query";
import { getPost } from "../../../lib/api/blog.Api";
const Home = () => {
  const { data } = useQuery({
    queryKey: ["get-Post"],
    queryFn: () => getPost(),
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid
            item
            md={3}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            <ProfileCard />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              paddingRight: {
                xs: "0rem",
                sm: "2rem",
                md: "none",
              },
              marginTop: {
                xs: "3rem",
                md: "none",
              },
            }}
          >
            <Box>
              {/* input box  */}
              <InputCard />
            </Box>

            <Box>
              {/* blog post  */}

              {data?.data?.map((item) => {
                return <BlogCard key={item._id} {...item} />;
              })}
            </Box>
          </Grid>
          {/* <Grid item xs={3}>
            <h2 style={{ border: "1px black solid" }}>world</h2>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
