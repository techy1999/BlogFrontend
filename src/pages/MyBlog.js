import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import UserBlog from "../components/UserBlog";
import EmptyScreen from "../components/common/EmptyScreen";

const MyBlog = () => {
  const [userBlogs, setUserBlogs] = useState([]);

  const getAllUserBlogs = async () => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");
      console.log("authToken", authToken, typeof authToken);
      const { data } = await axios.get(
        // "http://localhost:8000/api/my-blog",
        `${process.env.REACT_APP_ENVIRONMENT === "development"
          ? `${process.env.REACT_APP_DEV_URL}/my-blog`
          : `${process.env.REACT_APP_PROD_URL}/my-blog`
        }`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (data?.success) {
        console.log("Userdata", data.data);
     
        setUserBlogs(data?.data);
      }
    } catch (error) {
    
      console.log("User Error", error);
    }
  };

  useEffect(() => {
    getAllUserBlogs();
  }, []);
  return (
    <>

      {userBlogs.length != 0 &&
        userBlogs.map((userBlog) => (
          <>
            {" "}
            <UserBlog
              title={userBlog.title}
              content={userBlog.content}
              image={userBlog.image_url}
              video={userBlog.video_url}
              blogId={userBlog._id}
              createdAt={userBlog.createdAt}
              updatedAt={userBlog.updatedAt}
            />
          </>
        ))}

      {userBlogs.length == 0 && <EmptyScreen />}
    </>
  );
};

export default MyBlog;
