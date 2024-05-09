import React, { useState } from "react";
import { Box, Typography, TextField, Button,useMediaQuery, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleSnackbar from './../components/common/SnackBar';
import {SNACKBAR_SEVERITY} from '../constants/common/all.constants'
import HowToRegIcon from '@mui/icons-material/HowToReg';
const Register = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [severity, setSeverity] = useState(SNACKBAR_SEVERITY.SUCCESS);
  
  const notify = () => toast(loginResponse);

  //state
  const [inputs, setInputes] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    social_profile: "",
  });

  const handleChange = (e) => {
    setInputes((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      const { data } = await axios.post(
        // "http://localhost:8000/api/user/register",
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/user/register`
            : `${process.env.REACT_APP_PROD_URL}/user/register`
        }`,
        {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          experience: inputs.experience,
          social_profile: inputs.social_profile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setSeverity(SNACKBAR_SEVERITY.SUCCESS)
      setOpenSnackbar(true); 
      setSnackbarMessage("Registered successful ! Thank you ");
      setLoginResponse(data.data);
      navigate("/");
    } catch (error) {
      setSeverity(SNACKBAR_SEVERITY.ERROR)
      setOpenSnackbar(true); 
      setSnackbarMessage(error.response.data.message || error.response.statusText);
      console.log("error", error);
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
      <form onSubmit={handleSubmit} style={{padding:"1rem"}}>
        <Paper elevation={3} sx={{maxWidth:"450px",margin:"auto",marginBottom:"6rem"}}>
        <Box
          maxWidth={450}
          minHeight={500}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={10}
          padding={5}
          borderRadius={10}
          m={`${isMobile? "5%" : "auto"}`}
        >
          <Box display="flex" flexDirection="column"  alignItems="center">
            <HowToRegIcon color="primary" fontSize="large"/>
          <Typography
            sx={{ textTransform: "uppercase"}}
            variant="h5"
            padding={1}
            textAlign="center"
          >
            Register
          </Typography>
          </Box>
          
          <TextField
            size="small"
            placeholder="Enter Name"
            name="name"
            type={"text"}
            sx={{ marginTop: 3,borderRadius:"10px" }}
            value={inputs.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            size="small"
            placeholder="Enter Email"
            name="email"
            type={"email"}
            sx={{ marginTop: 3 ,borderRadius:"10px"}}
            value={inputs.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            size="small"
            placeholder="Enter Password"
            name="password"
            type={"password"}
            sx={{ marginTop: 3,borderRadius:"10px" }}
            value={inputs.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            size="small"
            placeholder="Enter Experience (Eg: 2)"
            name="experience"
            type={"number"}
            sx={{ marginTop: 3,borderRadius:"10px" }}
            value={inputs.experience}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            size="small"
            placeholder="Enter Social Profile (Link) "
            name="social_profile"
            type={"text"}
            sx={{ marginTop: 3,borderRadius:"10px" }}
            value={inputs.social_profile}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button
            sx={{ borderRadius: 5, marginTop: 3 }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={notify}
            fullWidth
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Already Registered ? Please Login
          </Button>
        </Box>
        </Paper>
      </form>
    </>
  );
};

export default Register;
