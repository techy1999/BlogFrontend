import React, { useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tab,
  Tabs,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import SimpleSnackbar from './common/SnackBar';
import {SNACKBAR_SEVERITY} from '../constants/common/all.constants'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  // Media query for detecting small screens (mobile devices)
  const isMobile = useMediaQuery("(max-width:600px)");
  const [value, setValue] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [severity, setSeverity] = useState(SNACKBAR_SEVERITY.SUCCESS);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  //global state
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
    try {
      dispatch(authActions.logout());
      setSeverity(SNACKBAR_SEVERITY.SUCCESS)
      setOpenSnackbar(true); 
      setSnackbarMessage("Logout Successful !" + "\n Bye !");
      // setTimeout(() => {
        navigate("/");
        window.location.reload(); //so that user can able to logout completely.
      // }, 1000); // Delay for 1 second (1000 milliseconds)
    } catch (error) {
      setSeverity(SNACKBAR_SEVERITY.ERROR)
      setOpenSnackbar(true); 
      setSnackbarMessage(error.response.data.message || error.response.statusText);
      console.log("err", error);
    }
  };

  

  const handleTabClick = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false); // Close the drawer on mobile
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
      <AppBar position="sticky">
     
        
        <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsMobileSidebarOpen(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          )}
          <Typography
            style={{ cursor: "pointer" }}
            variant="h4"
            onClick={() => navigate("/")}
          >
            Nomads{" "}
          </Typography>
         {!isMobile && <>
          <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
            <Tabs textColor="white" value={value}>
               <Tab label="Home" LinkComponent={Link} to="/" />  
              <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
              {isLogin && (
                <>
                  <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                  <Tab label="Create Blog" LinkComponent={Link} to="/blog" />
                </>
              )}
            </Tabs>
          </Box>
          {!isLogin && (
            <>
              <Box display={"flex"} marginLeft="auto">
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            </>
          )}
          {isLogin && (
            <>
              {" "}
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/profile"
              >
                Profile
              </Button>
              <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          </>}

        </Toolbar>
      </AppBar>

      {isMobile && <><Drawer PaperProps={{
            sx: { width: "80%", paddingTop:"20px",backgroundColor:"#1976D2",color:"#fff" },
          }} anchor="left" open={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)}>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsMobileSidebarOpen(false)}
            edge="start"
            sx={{float:"right", paddingLeft:"80%"}}
          >
            <CloseIcon />
          </IconButton>
         <div>
          
           <Tabs textColor="white" value={value} orientation="vertical">
             <Tab label="Home" component={Link} to="/" onClick={handleTabClick} />  
             <Tab label="Blogs" component={Link} to="/blogs" onClick={handleTabClick} />
             {isLogin && (
              <>
                <Tab label="My Blogs" component={Link} to="/my-blogs" onClick={handleTabClick} />
                <Tab label="Create blog" LinkComponent={Link} to="/blog" onClick={handleTabClick}  />
              </>
            )}
            {!isLogin && (
              <>
                <Button sx={{ margin: 1, color: "white" }} component={Link} to="/login" onClick={handleTabClick} >Login</Button>
                <Button sx={{ margin: 1, color: "white" }} component={Link} to="/register" onClick={handleTabClick}>Register</Button>
              </>
            )}
            {isLogin && (
              <>
                <Button sx={{ margin: 1, color: "white" }} component={Link} to="/profile" onClick={handleTabClick}>Profile</Button>
                <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Tabs>
        </div>
      </Drawer>
      </>
      }
    </>
  );
};

export default Header;
