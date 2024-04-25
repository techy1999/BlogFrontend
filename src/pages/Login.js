import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import SimpleSnackbar from './../components/common/SnackBar';
import {SNACKBAR_SEVERITY} from '../constants/common/all.constants';
import ThirdPartyAuthLogin from "../components/common/ThirdPartyAuthLogin";


const Login = () => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [severity, setSeverity] = useState(SNACKBAR_SEVERITY.SUCCESS);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // add the useDispatch hook to access the store dispatch function
  const isLogin = useSelector((state) => state.auth.isLogin); // TODO :: get the isLogin state from the Redux store
  //state
  const [inputs, setInputes] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputes((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/user/login`
            : `${process.env.REACT_APP_PROD_URL}/user/login`
        }`,
        // "http://localhost:8000/api/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      // Put the object into storage
      if (data.data) {
        setSeverity(SNACKBAR_SEVERITY.SUCCESS)
        setOpenSnackbar(true); 
        setSnackbarMessage("Logged In, SuccessFully !" + "\n\nWelcome Back!");
        localStorage.setItem("token", data.data); // store the token in the local storage
        dispatch(authActions.login(data.data)); // dispatch the login action with the token
        navigate("/");
        window.location.reload();
      } else {
        setSeverity(SNACKBAR_SEVERITY.ERROR)
        setOpenSnackbar(true); 
        setSnackbarMessage(data.message);
      }
    } catch (error) {
      setSeverity(SNACKBAR_SEVERITY.ERROR)
      setOpenSnackbar(true); 
      setSnackbarMessage(error.response.data.message || error.response.statusText);
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
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          minHeight={500}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin="50px auto"
          boxShadow="5px 5px 10px #1976D2"
          padding={5}
          borderRadius={10}
        >
          <Typography
            sx={{ textTransform: "uppercase",// Make the text bold
            textShadow: "5px 5px 10px #1976D2",}} // Apply text shadow
            variant="h2"
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            placeholder="Enter Email"
            name="email"
            type={"email"}
            sx={{ marginTop: 3 ,borderRadius:"10px"}}
            value={inputs.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            placeholder="Enter Password"
            name="password"
            type={"password"}
            sx={{ marginTop: 3,borderRadius:"10px" }}
            value={inputs.password}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button
            sx={{ borderRadius: 5, marginTop: 3 }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>

          <ThirdPartyAuthLogin />
          
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
            color="primary"
            onClick={() => navigate("/register")}
          >
            Not Registered ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
