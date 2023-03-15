import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export default function UserBlog({
  title,
  content,
  image,
  video,
  blogId,
  createdAt,
  updatedAt,
}) {
  //Delete Blog
  const deleteBlog = async (blogId) => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");
      console.log("authToken", authToken, typeof authToken);
      const { data } = await axios.delete(
        `http://localhost:8000/api/blog/${blogId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (data?.success) {
        alert("Blog delete successful !");
        window.location.reload();
      }
    } catch (error) {
      console.log("User Error", error);
    }
  };
  // Update Blog will work need to create a form ...
  const updateBlog = async (blogId) => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");
      console.log("authToken", authToken, typeof authToken);
      const { data } = await axios.put(
        `http://localhost:8000/api/blog/${blogId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (data?.success) {
        alert("Blog delete successful !");
      }
    } catch (error) {
      console.log("User Error", error);
    }
  };

  console.log("title userBlog", title, blogId);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card
      sx={{
        width: "50%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 5px #ccc",
        ":hover": {
          boxShadow: "10px 10px 10px #ccc",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            Date
          </Avatar>
        }
        subheader={createdAt}
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            Date
          </Avatar>
        }
        subheader={updatedAt}
      />

      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography paragraph color="text.primary">
          {content}
        </Typography>
      </CardContent>
      <CardMedia component="img" height="194" video={video} alt="Paella dish" />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={() => deleteBlog(blogId)} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
