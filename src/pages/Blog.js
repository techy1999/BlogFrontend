import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import TextField from "@mui/material/TextField";

import { Button, Paper, Container, Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";

import { Pagination } from "@mui/material";
import EmptyScreen from "../components/common/EmptyScreen"
import BasicPagination from "../components/common/BasicPagination";


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getAllBlogs = async (searchValue) => {
    console.log("sddsds2333 ", process.env.REACT_APP_DEV_URL);
    try {
      if (searchValue) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/blog?search=${searchValue}`
            : `${process.env.REACT_APP_PROD_URL}/blog?search=${searchValue}`
          }
          `
        );
        if (data?.success) {
          setBlogs(data?.data);
        }
      } else {
        const { data } = await axios.get(
          `${process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/blog`
            : `${process.env.REACT_APP_PROD_URL}/blog`
          }`
        );
        if (data?.success) {
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

      <Container>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
          <TextField
            fullWidth
            label="Search Blog By title,email,name"
            sx={{
              margin: "auto",
              width: "50%",
              display: "flex",
              alignItems: "center",
              marginTop: "40px",
              marginBottom:"20px"
            }}
            id="fullWidth"
            onChange={(e) => {
              // Do something with the search query here
              changeHandler(e);
            }}
          />
          <Button variant="outlined" onClick={searchHandler}>Search</Button>
        </Box>

        <Grid container spacing={4} mt={4}>



          {blogs &&
            blogs.map((blog) => (
              <Grid item xs={12} md={4}>
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
              </Grid>
            ))}

          {blogs.length == 0 && (<EmptyScreen />)}

        </Grid>
        {blogs.length != 0 && <BasicPagination page={10}/> } 
      </Container>


      {/* <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >



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

          {blogs.length == 0 && (<EmptyScreen />)}

        </Box>

      </Box> */}

    </>
  );
};

export default Blog;
