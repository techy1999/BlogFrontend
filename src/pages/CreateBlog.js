// import React, { useState } from "react";
// import { Box, Typography, TextField, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {TextareaAutosize} from "@mui/material";
// // // or
// // import { TextareaAutosize } from "@mui/base";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";

// //CreateBlog call
// const CreateBlog = () => {
//   const navigate = useNavigate();

//   //state
//   const [inputs, setInputes] = useState({
//     title: "",
//     content: "",
//     image_url: "",
//     video_url: "",
//   });

//   const [responseSuccessData, setSuccessResponseData] = useState(false);
//   const [responseFailedsData, setFailedResponseData] = useState(false);

//   const handleChange = (e) => {
//     setInputes((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const authToken = localStorage.getItem("token");

//     try {
//       const { data } = await axios.post(
//         `${
//           process.env.REACT_APP_ENVIRONMENT === "development"
//             ? `${process.env.REACT_APP_DEV_URL}/blog`
//             : `${process.env.REACT_APP_PROD_URL}/blog`
//         }`,
//         // "http://localhost:8000/api/blog",
//         inputs,
//         {
//           headers: {
//             "content-type": "application/json",
//             Authorization: "Bearer " + authToken,
//           },
//         }
//       );
//       console.log("data Created 111111111111111", data);
//       if (data?.success) {
//         // alert("Blog created Successful!");

//         setSuccessResponseData(true);
//         navigate("/");
//       } else {
//         setFailedResponseData(true);
//       }
//     } catch (error) {
//       setFailedResponseData(true);
//       console.log("error", error);
//     }
//   };

//   return (
//     <>
//       {responseSuccessData ? (
//         <Alert severity="success">
//           <AlertTitle>Success</AlertTitle>
//           `${responseSuccessData}` <strong>Go to Blogs</strong>
//         </Alert>
//       ) : (
//         ""
//       )}
//       {responseFailedsData ? (
//         <Alert severity="error">
//           <AlertTitle>Error</AlertTitle>
//           `Blog Creation failed` — <strong>try again with valid data !</strong>
//         </Alert>
//       ) : (
//         ""
//       )}
//       <form onSubmit={handleSubmit}>
//         <Box
//           maxWidth={450}
//           display={"flex"}
//           flexDirection={"column"}
//           alignItems={"center"}
//           justifyContent={"center"}
//           margin="auto"
//           marginTop={5}
//           boxShadow="10px 10px 20px #ccc"
//           padding={3}
//           borderRadius={5}
//         >
//           <Typography
//             sx={{ textTransform: "uppercase" }}
//             variant="h4"
//             padding={3}
//             textAlign="center"
//           >
//             Create Post
//           </Typography>
//           <TextField
//             placeholder="title"
//             name="title"
//             type={"text"}
//             sx={{ marginTop: 3, marginBottom: 3 }}
//             value={inputs.title}
//             onChange={handleChange}
//             required
//           />
//           <TextareaAutosize
//             placeholder="content"
//             name="content"
//             type={"text"}
//             sx={{ marginTop: 3 }}
//             value={inputs.content}
//             onChange={handleChange}
//             cols={25}
//             minRows={10}
//             required
//           />
//           <TextField
//             placeholder="Image Url"
//             name="image_url"
//             type={"text"}
//             sx={{ marginTop: 3 }}
//             value={inputs.image_url}
//             onChange={handleChange}
//             required
//           />

//           <TextField
//             placeholder="Video URL"
//             name="video_url"
//             type={"text"}
//             sx={{ marginTop: 3 }}
//             value={inputs.video_url}
//             onChange={handleChange}
//             required
//           />

//           <Button
//             sx={{ borderRadius: 3, marginTop: 3 }}
//             type="submit"
//             variant="contained"
//             color="primary"
//           >
//             Submit
//           </Button>
//           <Button
//             sx={{ borderRadius: 3, marginTop: 3 }}
//             type="submit"
//             color="primary"
//             onClick={() => navigate("/")}
//           >
//             want to see your Blogs ? Go here
//           </Button>
//         </Box>
//       </form>
//     </>
//   );
// };

// export default CreateBlog;

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Alert, InputLabel } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image_url: "",
    video_url: "",
  });

  const [responseSuccessData, setSuccessResponseData] = useState(false);
  const [responseFailedsData, setFailedResponseData] = useState(false);

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
        `${process.env.REACT_APP_ENVIRONMENT === "development"
          ? `${process.env.REACT_APP_DEV_URL}/blog`
          : `${process.env.REACT_APP_PROD_URL}/blog`
        }`,
        inputs,
        {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );

      if (data?.success) {
        setSuccessResponseData(true);
        navigate("/");
      } else {
        setFailedResponseData(true);
      }
    } catch (error) {
      setFailedResponseData(true);
      console.log("error", error);
    }
  };

  return (
    <>
      <AlertContainer
        type="success"
        show={responseSuccessData}
        message={`Blog created successfully! Go to Blogs`}
        onClose={() => setSuccessResponseData(false)}
      />
      <AlertContainer
        type="error"
        show={responseFailedsData}
        message={`Blog Creation failed — try again with valid data!`}
        onClose={() => setFailedResponseData(false)}
      />
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={600}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={3}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: 1 }}
          >
            Add Post
          </Typography>
          <hr sx={{  marginBottom: 3 }}  />
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
              <TextareaAutosize
                placeholder="Enter the Content"
                name="content"
                value={inputs.content}
                onChange={handleChange}
                cols={72}
                minRows={25}
                sx={{ width: "100%", marginTop: 3 }}
                required
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

const AlertContainer = ({ type, show, message, onClose }) => {
  return (
    show && (
      <Alert severity={type} onClose={onClose} sx={{ marginTop: 3 }}>
        <AlertTitle>{type === "success" ? "Success" : "Error"}</AlertTitle>
        {message}
      </Alert>
    )
  );
};

export default CreateBlog;

