import * as React from "react";
import { Card, Divider, useMediaQuery } from "@mui/material";

import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button, TextField } from "@mui/material";
import AlertContainer from "./common/AlertContainer";
import Tooltip from "@mui/material/Tooltip";
import ConfirmationModel from "./common/ConfirmationModel";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export default function UserBlog({
  title,
  content,
  image,
  video,
  blogId,
  createdAt,
  updatedAt,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [confirmationModelOpen, setConfirmationModelOpen] =
    React.useState(false);
  const [responseSuccessData, setResponseSuccessData] = React.useState(false);
  const [responseFailedData, setResponseFailedData] = React.useState(false);
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
        // `http://localhost:8000/api/blog/${blogId}`,
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/blog/${blogId}`
            : `${process.env.REACT_APP_PROD_URL}/blog/${blogId}`
        }`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        },
      );
      if (data?.success) {
        setConfirmationModelOpen(!confirmationModelOpen);
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
        // `http://localhost:8000/api/blog/${blogId}`,
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/blog/${blogId}`
            : `${process.env.REACT_APP_PROD_URL}/blog/${blogId}`
        }`,
        updatedBlogData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      // If the API call is successful, alert the user and reload the page
      if (data?.success) {
        // alert("Blog update successful!");
        setConfirmationModelOpen(!confirmationModelOpen);
        setResponseSuccessData(true);
        window.location.reload();
      }
    } catch (error) {
      setResponseFailedData(true);
      console.log("User Error", error);
    }
  };
  const handleEditClick = () => {
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };
  return (
    <>
      <AlertContainer
        type="success"
        show={responseSuccessData}
        message={`Blog created successfully! Go to Blogs`}
        onClose={() => setResponseSuccessData(false)}
      />

      <AlertContainer
        type="error"
        show={responseFailedData}
        message={`Blog created successfully! Go to Blogs`}
        onClose={() => setResponseFailedData(false)}
      />

      {/* <button onClick={()=> setConfirmationModelOpen(!confirmationModelOpen)} >Set</button> */}
      <ConfirmationModel
        message={"Are you sure you want to delete this blog ? "}
        confirmationModelOpen={confirmationModelOpen}
        setConfirmationModelOpen={setConfirmationModelOpen}
        handleDelete={() => deleteBlog(blogId)}
        blogId={blogId}
      />
      <Card
        sx={{
          width: `${isMobile ? "88%" : "50%"}`,
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 5px #ccc",
          ":hover": {
            boxShadow: "10px 10px 10px #ccc",
          },
        }}
      >
          <Typography variant="h3" color="primary.main">
            {title}
          </Typography>
        <CardHeader
          avatar={
            <CalendarMonthIcon  sx={{ bgcolor: green[500] }} aria-label="recipe" />
          }
          title={`Create at 👉  ${createdAt} `}
          sx={{padding:0}}
        />
        <CardHeader
          avatar={
            <CalendarMonthIcon sx={{ bgcolor: green[500] }} aria-label="recipe">
            </CalendarMonthIcon>
          }
          title={`Create at 👉  ${updatedAt} `}
          sx={{padding:0}}
        />

        <Divider sx={{marginBottom:"10px" , marginTop:"10px"}}/>

        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
        
          <Typography
            paragraph
            color="text.secondary"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon
                onClick={() => {
                  setConfirmationModelOpen(!confirmationModelOpen);
                }}
              />
            </IconButton>
          </Tooltip>
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
    </>
  );
}
