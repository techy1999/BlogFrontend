import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
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
      const { data } = await axios.get(
        `https://fierce-teal-angelfish.cyclic.app/api/blog/${id}`
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
        `https://fierce-teal-angelfish.cyclic.app/api/comments/${id}`
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

    try {
      const { data } = await axios.post(
        `https://fierce-teal-angelfish.cyclic.app/api/comments/${id}`,
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
        console.log("comment added", data);
        setComments([...comments, data?.data]);
        setComment("");
        alert("commented successfully");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container" style={{ width: "60%", margin: "auto" }}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      {blog.image_url && <img src={blog.image_url} alt="blog" />}
      {blog.video_url && (
        <video controls>
          <source src={blog.video_url} type="video/mp4" />
        </video>
      )}
      <p>Author: {blog.author.name}</p>
      <p>Email: {blog.author.email}</p>
      <p>Created At: {blog.createdAt}</p>
      <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>Comments</h2>
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
      <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default BlogDetail;
