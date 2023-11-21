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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button, TextField } from "@mui/material";

export default function UserBlog({
  title,
  content,
  image,
  video,
  blogId,
  createdAt,
  updatedAt,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [updatedBlogData, setUpdatedBlogData] = React.useState({
    title: title,
    content: content,
    video: video,
    image: image,
  });

  //Delete Blog
  const deleteBlog = async (blogId) => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");

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
  const updateBlog = async () => {
    try {
      // Get the auth token from localStorage
      const authToken = localStorage.getItem("token");

      // Make the API call to update the blog
      const { data } = await axios.put(
        `http://localhost:8000/api/blog/${blogId}`,
        updatedBlogData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // If the API call is successful, alert the user and reload the page
      if (data?.success) {
        alert("Blog update successful!");
        window.location.reload();
      }
    } catch (error) {
      console.log("User Error", error);
    }
  };

  console.log("title userBlog", title, blogId);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };
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

      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={() => deleteBlog(blogId)} />
        </IconButton>
      </CardActions>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={updatedBlogData.title}
            onChange={(e) =>
              setUpdatedBlogData({
                ...updatedBlogData,
                title: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Content"
            value={updatedBlogData.content}
            onChange={(e) =>
              setUpdatedBlogData({
                ...updatedBlogData,
                content: e.target.value,
              })
            }
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={updatedBlogData.image}
            onChange={(e) =>
              setUpdatedBlogData({
                ...updatedBlogData,
                IMAGE: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Video URL"
            value={updatedBlogData.video}
            onChange={(e) =>
              setUpdatedBlogData({
                ...updatedBlogData,
                video: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={updateBlog}>Update</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
