import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    experience: "",
    social_profile: "",
  });

  const userProfile = async () => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");

      const { data } = await axios.get(
        `https://fierce-teal-angelfish.cyclic.app/api/user/profile`,
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
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], fontSize: "15px" }}
              aria-label="recipe"
            >
              User
            </Avatar>
          }
          title="Profile"
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <h3>UserName : {user.name} </h3>
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
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
