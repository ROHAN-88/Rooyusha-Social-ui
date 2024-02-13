import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Popover from "@mui/material/Popover";
import * as React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "../../../../../lib/api/blog.Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./BlogCard.css";

const BlogCard = (props) => {
  //?====navigation========

  const navigation = useNavigate();

  //? props ==============================
  const {
    _id,
    text,
    imageUrl,
    imageType,
    firstName,
    lastName,
    pictureUrl,
    createdAt,
    userId,
  } = props;

  //!react -redux
  const { mode } = useSelector((state) => state.darkMode);

  //!=========getting data from localStorage ====================
  const localUserId = localStorage.getItem("userId");
  // //!=====================mui ==============
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // //!popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //!============like button ======================
  // Create a state variable to track the click status
  const [isClicked, setIsClicked] = React.useState(false);

  // Event handler to handle the click
  const handleButtonClick = () => {
    // Toggle the state when the button is clicked
    setIsClicked(!isClicked);
  };

  //?====================Mutation =====================
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["Delete-key"],
    mutationFn: () => deletePost(_id),
    onSuccess: () => {
      queryClient.invalidateQueries("get-Post");
    },
  });
  5;

  return (
    <Box
      sx={{
        margin: {
          xs: "0 0 2rem 0rem",
          md: "0 0 2rem 4rem ",
        },
      }}
    >
      <Card
        sx={{ maxWidth: 645, borderRadius: "20px " }}
        id={mode ? "darkModeCard" : ""}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: "1rem",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {pictureUrl ? <img src={pictureUrl} width="contained" /> : "R"}
              </Avatar>
            }
            title={firstName + " " + lastName}
            subheader={createdAt}
          />

          {userId == localUserId && (
            <div>
              <Button onClick={handleClick}>Delete</Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div style={{ borderRadius: "5rem" }}>
                  <Typography sx={{ p: 2 }}>Do You want to Delete</Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleClose();
                        mutate();
                      }}
                    >
                      yes
                    </Button>

                    <Button onClick={() => handleClose()} variant="contained">
                      No
                    </Button>
                  </div>
                </div>
              </Popover>
              {/* //? =========edit Button============  */}
              <Button onClick={() => navigation(`/EditPost/${_id}`)}>
                Edit
              </Button>
            </div>
          )}
        </div>
        {imageType === "Image" && imageUrl && (
          <CardMedia
            component="img"
            // height="550"

            image={imageUrl}
            alt="Paella dish"
          />
        )}
        {imageType === "Video" && imageUrl && (
          // <CardMedia src={imageUrl} height="550" alt="VIDEO" />
          <video height="550" type="video/mp4" controls>
            <source src={imageUrl} />
          </video>
        )}
        <CardContent>
          <Typography
            variant="h5"
            color="text.secondary"
            id={mode ? "darkModeCard" : ""}
          >
            {text}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Box sx={{ display: "flex" }}>
            <IconButton
              aria-label="add to favorites"
              style={{ color: isClicked ? "red" : "" }}
              onClick={handleButtonClick}
              id={mode ? "darkModeCard" : ""}
            >
              <FavoriteIcon />
            </IconButton>
            <h4>{Math.floor(Math.random() * (10000 - 10 + 1)) + 10}K</h4>
          </Box>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BlogCard;
