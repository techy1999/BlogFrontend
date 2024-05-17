import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import TextField from "@mui/material/TextField";

import { Button, Paper, Container, Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";

import EmptyScreen from "../components/common/EmptyScreen";
import BasicPagination from "../components/common/BasicPagination";
import { PAGE_CONSTANT } from "../constants/common/all.constants";
import { useLoading } from "../components/customHooks/useLoader";
import LoaderScreen from "../components/common/LoaderScreen";
import SearchIcon from '@mui/icons-material/Search';

const Blog = () => {
  const {loading, showLoading,hideLoading} = useLoading();
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(null);

  const getAllBlogs = async (searchValue) => {
    try {
      showLoading();
      if (searchValue) {
        const { data } = await axios.get(
          `${
            process.env.REACT_APP_ENVIRONMENT === "development"
              ? `${process.env.REACT_APP_DEV_URL}/blog?search=${searchValue}&page=${pageNumber}&limit=${PAGE_CONSTANT.LIMIT_RESULT}`
              : `${process.env.REACT_APP_PROD_URL}/blog?search=${searchValue}&page=${pageNumber}&limit=${PAGE_CONSTANT.LIMIT_RESULT}`
          }
          `,
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
          }`,
        );
        if (data.data?.data) {
          setBlogs(data?.data?.data);
          setTotalPageNumber(data?.data?.totalPages);
        }
      }
    } catch (error) {
      console.log("Error", error);
    } finally  {
      hideLoading();
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
            onChange={(e) => {
              // Do something with the search query here
              changeHandler(e);
            }}
          />
          <Button variant="outlined" onClick={searchHandler}>
            <SearchIcon />  Search
          </Button>
        </Box>

        <Grid container spacing={4} mt={4}>
        {loading && <LoaderScreen open={loading} handleClose={loading}/>}
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

          {blogs.length == 0 && <EmptyScreen />}
        </Grid>

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
