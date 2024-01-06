import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ImageListItem } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Box from "@mui/material/Box"
const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    experience: "",
    social_profile: "",
    blogOfUser: "",
  });

  const userProfile = async () => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");

      const { data } = await axios.get(
        // `http://localhost:8000/api/user/profile`,
        `${process.env.REACT_APP_ENVIRONMENT === "development"
          ? `${process.env.REACT_APP_DEV_URL}/user/profile`
          : `${process.env.REACT_APP_PROD_URL}/user/profile`
        }`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (data?.success) {
        console.log("Profile data", data.data);
        setUser(data.data);
      }
    } catch (error) {
      console.log("Profile Error", error);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <>
      {/* 
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card
            sx={{
              width: "50%",
              margin: "auto",
              mt: 4,
              padding: 2,
              boxShadow: "5px 5px 5px #ccc",
              ":hover": {
                boxShadow: "10px 10px 10px #ccc",
              },
              minHeight: "60vh"
            }}
          >


            <CardContent >
              <Typography variant="body2" color="text.secondary">
                <h3>  <PersonIcon />  <span >User Name :  </span> {user.name} </h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Email :{user.email}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Experience :{user.experience}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Social Profile :{user.social_profile}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Total Blog :{user.blogOfUser}</h3>
              </Typography>

              <Typography paragraph color="text.primary">
                <h3>Total Blog views :{user.blogOfUser}</h3>
              </Typography>

              <Typography paragraph color="text.primary">
                <h3>Total Blog Likes :{user.blogOfUser}</h3>
              </Typography>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{width:"50%"}}>
            <img src="https://media.istockphoto.com/id/493763323/photo/happy-multiethnic-peoples-headshot.jpg?s=2048x2048&w=is&k=20&c=FbpfTf-lI9pULj9lrx9KmoZqz5XsTjuWvQo3nUO05F4=" sx={{ width: "40px" }} />
          </Box>

        </Grid>

      </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card
            sx={{
              width: "50%",
              margin: "auto",
              mt: 4,
              padding: 2,
              boxShadow: "5px 5px 5px #ccc",
              ":hover": {
                boxShadow: "10px 10px 10px #ccc",
              },
              minHeight: "60vh"
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{paddingBottom:"20px"}}>
                <h3><PersonIcon /> <span>User Name: </span>{user.name}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Email: {user.email}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Experience: {user.experience}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Social Profile: {user.social_profile}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Total Blog: {user.blogOfUser}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Total Blog views: {user.blogOfUser}</h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>Total Blog Likes: {user.blogOfUser}</h3>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ width: "80%" }}>
            <ImageListItem key={"sdsdffd"}>
              <img
              
                src={`https://media.istockphoto.com/id/493763323/photo/happy-multiethnic-peoples-headshot.jpg?s=2048x2048&w=is&k=20&c=FbpfTf-lI9pULj9lrx9KmoZqz5XsTjuWvQo3nUO05F4=`}
                alt={"Image "}
                loading="lazy"
              />
            </ImageListItem>
            {/* <img
              src="https://media.istockphoto.com/id/493763323/photo/happy-multiethnic-peoples-headshot.jpg?s=2048x2048&w=is&k=20&c=FbpfTf-lI9pULj9lrx9KmoZqz5XsTjuWvQo3nUO05F4="
              sx={{ width: "50%", height: "auto" }} // Adjust the styling here
              alt="Profile"
            /> */}
          </Box>
        </Grid>
      </Grid>



    </>
  );
};

export default Profile;
