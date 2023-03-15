import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/blog");
      if (data?.success) {
        console.log("data", data);
        setBlogs(data?.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <h1>Blog </h1>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            content={blog.content}
            image={blog.image_url}
            video={blog.video_url}
            name={blog.author.name}
            email={blog.author.email}
            createdAt={blog.createdAt}
          />
        ))}
    </>
  );
};

export default Blog;
