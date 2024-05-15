import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { InputLabel } from "@mui/material";
import SimpleSnackbar from "../components/common/SnackBar";
import { SNACKBAR_SEVERITY } from "../constants/common/all.constants";
import JoditEditor from "jodit-react";

const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // Media query for detecting small screens (mobile devices)
  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [severity, setSeverity] = useState(SNACKBAR_SEVERITY.SUCCESS);

  const [inputs, setInputs] = useState({
    title: "",
    image_url: "",
    video_url: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/blog`
            : `${process.env.REACT_APP_PROD_URL}/blog`
        }`,
        {
          ...inputs,
          content: content,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        },
      );

      if (data?.success) {
        setSeverity(SNACKBAR_SEVERITY.SUCCESS);
        setOpenSnackbar(true);
        setSnackbarMessage("Blog Created , SuccessFully !");

        navigate("/");
      } else {
        setSeverity(SNACKBAR_SEVERITY.ERROR);
        setOpenSnackbar(true);
        setSnackbarMessage(data.message);
      }
    } catch (error) {
      setSeverity(SNACKBAR_SEVERITY.ERROR);
      setOpenSnackbar(true);
      setSnackbarMessage(
        error.response.data.message || error.response.statusText,
      );
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
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={600}
          padding={3}
          borderRadius={5}
          boxShadow="5px 5px 10px #1976D2"
          m={`${isMobile ? "5%" : "50px auto"}`}
        >
          <Typography
            sx={{
              textTransform: "uppercase", // Make the text bold
              textShadow: "5px 5px 10px #1976D2",
            }} // Apply text shadow
            variant="h2"
            padding={3}
            textAlign="center"
          >
            Add Post
          </Typography>
          <Box mt={4} mb={4}>
            <Divider style={{ backgroundColor: "#1976D2" }} />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>Title</InputLabel>
              <TextField
                name="title"
                type="text"
                placeholder="Enter the Title"
                fullWidth
                value={inputs.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>Image URL</InputLabel>
              <TextField
                placeholder="Enter the Image URL"
                name="image_url"
                type="text"
                fullWidth
                value={inputs.image_url}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ marginBottom: 1 }}>Content </InputLabel>
              {/* Todo : After working for some day with new editor */}
              {/* <TextareaAutosize
                placeholder="Enter the Content"
                name="content"
                value={inputs.content}
                onChange={handleChange}
                cols={`${isMobile?'36':'72'}`}
                minRows={10}
                sx={{ width: "100%", marginTop: 3}}
                style={{ padding:"10px"}}
                required
              /> */}
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ marginBottom: 1 }}>Video URL </InputLabel>
              <TextField
                placeholder="Enter the Vide URL"
                name="video_url"
                type="text"
                fullWidth
                value={inputs.video_url}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 3, marginTop: 3 }}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
