import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import TextField from "@mui/material/TextField";

import { Button, Paper, Container, Typography, Stack } from "@mui/material";
import { Box, Grid } from "@mui/material";

import { Pagination } from "@mui/material";
import EmptyScreen from "../components/common/EmptyScreen";
import BasicPagination from "../components/common/BasicPagination";
import { PAGE_CONSTANT } from "../constants/common/all.constants";

const RecentBlogs = ({ recentBlogs }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Recent Blogs
      </Typography>
      {recentBlogs &&
        recentBlogs.map((blog) => (
          <Box key={blog._id} sx={{ marginBottom: "1rem" }}>
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
          </Box>
        ))}
    </div>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(null);

  const getAllBlogs = async (searchValue) => {
    try {
      if (searchValue) {
        const { data } = await axios.get(
          `${
            process.env.REACT_APP_ENVIRONMENT === "development"
              ? `${process.env.REACT_APP_DEV_URL}/blog?search=${searchValue}&page=${pageNumber}&limit=${PAGE_CONSTANT.LIMIT_RESULT}`
              : `${process.env.REACT_APP_PROD_URL}/blog?search=${searchValue}&page=${pageNumber}&limit=${PAGE_CONSTANT.LIMIT_RESULT}`
          }
          `
        );

        if (data?.data?.data) {
          setBlogs(data?.data?.data);

          setTotalPageNumber(data?.data?.totalPages);
        }
      } else {
        const { data } = await axios.get(
          `${
            process.env.REACT_APP_ENVIRONMENT === "development"
              ? `${process.env.REACT_APP_DEV_URL}/blog?page=${pageNumber}&limit=${PAGE_CONSTANT.LIMIT_RESULT}`
              : `${process.env.REACT_APP_PROD_URL}/blog?page=${pageNumber}&limit=${PAGE_CONSTANT.LIMIT_RESULT}`
          }`
        );
        if (data.data?.data) {
          setBlogs(data?.data?.data);

          setTotalPageNumber(data?.data?.totalPages);
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllBlogs(searchValue);
  }, [pageNumber]);

  const changeHandler = async (e) => {
    setSearchValue(e.target.value);
  };
  const searchHandler = async () => {
    getAllBlogs(searchValue);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
              marginBottom: "20px",
            }}
            id="fullWidth"
            onChange={changeHandler}
          />
          <Button variant="outlined" onClick={searchHandler}>
            Search
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          {/* Main Blog List */}
          <Box sx={{ flex: 2, margin: "10px", marginLeft: "10px" }}>
            {blogs.map((blog) => (
              <Box key={blog._id} sx={{ marginBottom: "1rem" }}>
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
              </Box>
            ))}
            {blogs.length === 0 && <EmptyScreen />}
          </Box>

          {/* Recent Blogs */}
          <Box sx={{ flex: 1 }}>
            <RecentBlogs recentBlogs={blogs.slice(0, 2)} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {totalPageNumber != null && (
            <BasicPagination
              onChange={handlePageChange}
              page={totalPageNumber}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Blog;
