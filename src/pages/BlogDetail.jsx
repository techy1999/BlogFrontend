import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import SimpleSnackbar from "../components/common/SnackBar";
import { SNACKBAR_SEVERITY } from "../constants/common/all.constants";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useMediaQuery, Divider } from "@mui/material";
import { useLoading } from "../components/customHooks/useLoader";
import LoaderScreen from "../components/common/LoaderScreen";

const BlogDetail = () => {
  // Media query for detecting small screens (mobile devices)
  const {loading, showLoading,hideLoading} = useLoading();
  const isMobile = useMediaQuery("(max-width:600px)");
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
      showLoading();
      // const { data } = await axios.get(`http://localhost:8000/api/blog/${id}`);
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/blog/${id}`
            : `${process.env.REACT_APP_PROD_URL}/blog/${id}`
        }`,
      );
      if (data?.success) {
        setBlog(data?.data);
      }
    } catch (error) {
      console.log("Error", error);
    } finally{
      hideLoading();
    }
  };
  const getAllCommentsOnBlog = async () => {
    try {
      showLoading();
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/comments/${id}`
            : `${process.env.REACT_APP_PROD_URL}/comments/${id}`
        }`,
      );
      if (data?.success) {
        setComments(data?.data);
      }
    } catch (error) {
      console.log("Error", error);
    } finally{
      hideLoading();
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
        showLoading();
        const { data } = await axios.post(
          // `http://localhost:8000/api/comments/${id}`,
          `${
            process.env.REACT_APP_ENVIRONMENT === "development"
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
          },
        );
        if (data?.success) {
          setComments([...comments, data?.data]);
          setComment("");
          setSeverity(SNACKBAR_SEVERITY.SUCCESS);
          setOpenSnackbar(true);
          setSnackbarMessage(
            "Commnent Succesful, SuccessFully !" + "Thank you !",
          );
        } else {
          navigate("/login");
        }
      } catch (error) {
        setSeverity(SNACKBAR_SEVERITY.ERROR);
        setOpenSnackbar(true);
        setSnackbarMessage(
          error.response.data.message || error.response.statusText,
        );
        console.log("Error", error);
      }
      finally{
        hideLoading();
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
      {loading && <LoaderScreen open={loading} handleClose={loading}/>}
      <div
        className="container"
        style={{
          width: `${isMobile ? "85%" : "60%"}`,
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
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></p>

        {blog.video_url && (
          <video controls width="100%">
            <source src={blog.video_url} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}

        <p style={{ paddingTop: "10px" }}>
          <Chip
            icon={<FaceIcon />}
            label={"Author : " + blog.author.name}
            color="primary"
          />
        </p>
        <p style={{ paddingTop: "10px" }}>
          <Chip
            icon={<EmailIcon />}
            label={"Email : " + blog.author.email}
            color="primary"
          />
        </p>
        <p style={{ paddingTop: "10px", paddingBottom: "20px" }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={"Created At : " + blog.createdAt}
            color="primary"
          />
        </p>
        <Divider variant="middle" component="p" />
        <h2 style={{ marginBottom: "10px", marginTop: "30px" }}>
          {" "}
          <CommentIcon /> Comments{" "}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "baseline",
            justifyItems: "end",
            flexDirection: `${isMobile ? "column" : ""}`,
          }}
        >
          <textarea
            rows="4"
            cols={`${isMobile ? 20 : "50"}`}
            maxlength="200"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              padding: "10px 20px",
            }}
            placeholder="Add a comment..."
            required
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#3C76D2",
              color: "white",
              padding: "10px 50px",
              border: "none",
              marginLeft: "20px",
              borderRadius: "10px",
              marginTop: "10px",
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
                marginTop: "20px",
                marginBottom: "2px",
                width: `${isMobile ? "100%" : "80%"}`,
                borderRadius: "20px",
                border: "1px solid  #ccc",
                boxShadow: "5px 5px 10px #1976D2",
              }}
            >
              <p style={{ color: "black", padding: "5px" }}>
                <CommentIcon /> {comment?.content}
              </p>
              <Divider variant="middle" />
              <p style={{ paddingTop: "10px" }}>
                <Chip
                  icon={<FaceIcon />}
                  label={
                    "By : " + comment.author.name + ", " + comment.author.email
                  }
                  color="primary"
                />
              </p>
              <p style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <Chip
                  icon={<AccessTimeIcon />}
                  label={"Created At : " + comment.createdAt}
                  color="primary"
                />
              </p>
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
