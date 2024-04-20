import axios from "axios";
export const fetchUserProfile = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const { data } = await axios.get(
        `${process.env.REACT_APP_ENVIRONMENT === "development"
          ? `${process.env.REACT_APP_DEV_URL}/user/profile`
          : `${process.env.REACT_APP_PROD_URL}/user/profile`
        }`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (data?.success) {
        return data.data; // Return the fetched user profile data
      }
    } catch (error) {
      console.log("Profile Error", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };