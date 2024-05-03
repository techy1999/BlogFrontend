import React, { useState, useEffect } from "react";

import { authActions } from "../redux/store";
import { Card, Divider, Chip, useMediaQuery, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { fetchUserProfile } from "../services/profile/profile.service";
import ProfileDetail from "./../assets/undraw_profile_detail.svg";
import { useDispatch } from "react-redux";
import { SNACKBAR_SEVERITY } from "../constants/common/all.constants";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../components/common/SnackBar";

const Profile = () => {
  // Media query for detecting small screens (mobile devices)
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [severity, setSeverity] = useState(SNACKBAR_SEVERITY.SUCCESS);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    experience: "",
    social_profile: "",
    blogOfUser: "",
  });

  const userProfile = async () => {
    try {
      const userProfileData = await fetchUserProfile();
      setUser(userProfileData);
    } catch (error) {
      // Handle error if needed
      console.log("Profile Error", error);
      throw error;
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  const handleLogout = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
    try {
      dispatch(authActions.logout());
      setSeverity(SNACKBAR_SEVERITY.SUCCESS);
      setOpenSnackbar(true);
      setSnackbarMessage("Logout Successful !" + "\n Bye !");
      // setTimeout(() => {
      // navigate("/");
      // window.location.reload(); //so that user can able to logout completely.
      // }, 1000); // Delay for 1 second (1000 milliseconds)
    } catch (error) {
      setSeverity(SNACKBAR_SEVERITY.ERROR);
      setOpenSnackbar(true);
      setSnackbarMessage(
        error.response.data.message || error.response.statusText
      );
      console.log("err", error);
    }
  };

  return (
    <>
      <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={snackbarMessage}
        severity={severity}
      />
      <Grid
        container
        spacing={2}
        mt={4}
        p={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid item xs={8}>
          <Card
            sx={{
              width: "100%",
              margin: "auto",
              mt: 2,
              padding: 2,
              boxShadow: "5px 5px 10px  #1976D2",
              minHeight: "60vh",
            }}
          >
            <Typography variant="h2" textAlign="center">
              User Profile
            </Typography>
            <Box sx={{ width: "50%" }}>
              <img
                src={ProfileDetail}
                alt={"Profile Image"}
                height={250}
                width={500}
              />
            </Box>

            <Box mt={3}>
              <Divider style={{ backgroundColor: "#1976D2" }} />
            </Box>

            <CardContent sx={{ padding: "20px" }}>
              <Typography paragraph color="text.primary">
                <h3>
                  {" "}
                  <Chip
                    sx={{ marginRight: "10px" }}
                    avatar={<Avatar>E </Avatar>}
                    label="Email : "
                  />
                  {user.email}
                </h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>
                  <Chip
                    sx={{ marginRight: "10px" }}
                    avatar={<Avatar>E </Avatar>}
                    label="Experience : "
                  />
                  {user.experience} in years.
                </h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>
                  <Chip
                    sx={{ marginRight: "10px" }}
                    avatar={<Avatar>S </Avatar>}
                    label=" Social Profile : "
                  />
                  <a href="/">{user.social_profile}</a>
                </h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>
                  <Chip
                    sx={{ marginRight: "10px" }}
                    avatar={<Avatar>T </Avatar>}
                    label="Total Blog : "
                  />{" "}
                  {user.blogOfUser}
                </h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>
                  <Chip
                    sx={{ marginRight: "10px" }}
                    avatar={<Avatar>T </Avatar>}
                    label="Total Blog views : "
                  />{" "}
                  {user.blogOfUser}
                </h3>
              </Typography>
              <Typography paragraph color="text.primary">
                <h3>
                  {" "}
                  <Chip
                    sx={{ marginRight: "10px" }}
                    avatar={<Avatar>T </Avatar>}
                    label="Total Blog Likes : "
                  />{" "}
                  {user.blogOfUser}
                </h3>
              </Typography>
              <Button
                onClick={() => handleLogout()}
                variant="contained"
                color="primary"
                sx={{ margin: 1, color: "white" }}
                href="/"
                fullWidth
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
