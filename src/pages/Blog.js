import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getAllBlogs = async (searchValue) => {
    try {
      if (searchValue) {
        const { data } = await axios.get(
          `https://fierce-teal-angelfish.cyclic.app/api/blog?search=${searchValue}`
        );
        if (data?.success) {
          console.log("seachHandler data", data);
          setBlogs(data?.data);
        }
      } else {
        const { data } = await axios.get(
          "https://fierce-teal-angelfish.cyclic.app/api/blog"
        );
        if (data?.success) {
          console.log("data", data);
          setBlogs(data?.data);
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllBlogs(searchValue);
  }, []);

  const changeHandler = async (e) => {
    setSearchValue(e.target.value);
  };
  const searchHandler = async () => {
    getAllBlogs(searchValue);
  };

  return (
    <>
      <h1>Blog </h1>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          fullWidth
          label="Search Blog By title,email,name"
          sx={{
            margin: "auto",
            width: "50%",
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
          }}
          id="fullWidth"
          onChange={(e) => {
            // Do something with the search query here
            changeHandler(e);
          }}
        />
        <Button onClick={searchHandler}>Search</Button>
      </Box>

      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            title={blog.title}
            content={blog.content}
            image={blog.image_url}
            video={blog.video_url}
            name={blog.author.name}
            email={blog.author.email}
            likeCount={blog.likeCount}
            createdAt={blog.createdAt}
          />
        ))}
    </>
  );
};

export default Blog;
