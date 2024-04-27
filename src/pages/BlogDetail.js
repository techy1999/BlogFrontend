import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import SimpleSnackbar from './../components/common/SnackBar';
import {SNACKBAR_SEVERITY} from '../constants/common/all.constants'

const BlogDetail = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [severity, setSeverity] = useState(SNACKBAR_SEVERITY.SUCCESS);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image_url: "",
    video_url: "",
    author: { name: "", email: "" },
    createdAt: "",
  });

  const getBlog = async () => {
    try {
      // const { data } = await axios.get(`http://localhost:8000/api/blog/${id}`);
      const { data } = await axios.get(
        `${process.env.REACT_APP_ENVIRONMENT === "development"
          ? `${process.env.REACT_APP_DEV_URL}/blog/${id}`
          : `${process.env.REACT_APP_PROD_URL}/blog/${id}`
        }`
      );
      if (data?.success) {
        console.log("data ON DETAIL PAGE :", data);
        setBlog(data?.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const getAllCommentsOnBlog = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ENVIRONMENT === "development"
          ? `${process.env.REACT_APP_DEV_URL}/comments/${id}`
          : `${process.env.REACT_APP_PROD_URL}/comments/${id}`
        }`
      );
      if (data?.success) {
        console.log("data ON Comment PAGE :", data);
        setComments(data?.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getBlog();
    getAllCommentsOnBlog();
  }, [id]);

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/login");
      return;
    } else {
      try {
        const { data } = await axios.post(
          // `http://localhost:8000/api/comments/${id}`,
          `${process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/comments/${id}`
            : `${process.env.REACT_APP_PROD_URL}/comments/${id}`
          }`,
          {
            content: comment,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + authToken,
            },
          }
        );
        if (data?.success) {
          setComments([...comments, data?.data]);
          setComment("");
          setSeverity(SNACKBAR_SEVERITY.SUCCESS)
          setOpenSnackbar(true); 
          setSnackbarMessage("Commnent Succesful, SuccessFully !" + "Thank you !");
        } else {

          console.log("else condtion redirect to loginpage");
          navigate("/login");
        }
      } catch (error) {
        setSeverity(SNACKBAR_SEVERITY.ERROR)
          setOpenSnackbar(true); 
          setSnackbarMessage(error.response.data.message || error.response.statusText);
        console.log("Error", error);
      }
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
      <div
        className="container"
        style={{
          width: "60%",
          margin: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        {blog.image_url && <img src={blog.image_url} alt="blog" width="100%" />}

        <h1
          style={{
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          {blog.title}
        </h1>
        <p
          style={{
            fontWeight: "lighter",
            lineHeight: "30px",
            fontFamily: "sans-serif",
            fontSize: "20px",
            paddingTop: "10px",
            paddingBottom: "20px",
          }}
        >
          {blog.content}
        </p>

        {blog.video_url && (
          <video controls width="100%">
            <source src={blog.video_url} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
        <p>Author: {blog.author.name}</p>
        <p>Email: {blog.author.email}</p>
        <p>Created At: {blog.createdAt}</p>
        <h2 style={{ marginBottom: "10px", marginTop: "10px" }}> <CommentIcon /> Comments</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "baseline",
            justifyItems: "end",
          }}
        >
          <textarea
            rows="4"
            cols="50"
            maxlength="200"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              padding: "10px 20px",
            }}
            placeholder="Add a comment..."
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#3C76D2",
              color: "white",
              padding: "10px 50px",
              border: "none",
              marginLeft: "20px",
            }}
          >
            Add Comment
          </button>
        </form>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              style={{
                padding: "10px",
                marginTop: "2px",
                marginBottom: "2px",
              }}
            >
              <p style={{ color: "yellow", background: "black", padding: "5px" }}>
                {comment?.content}
              </p>
              <p>
                By: {comment.author.name} , {comment.author.email}
              </p>
              <p>Created At: {comment.createdAt}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        
      </div>

    </>

  );
};

export default BlogDetail;
