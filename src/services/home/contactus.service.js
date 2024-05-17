// Write the API call here...
import axios from "axios";
import { URL_CONSTANTS } from "../../constants/common/url.constants";
export const contactUsPost = async (payload) => {
  console.log("payload ", payload);
  try {
    const result = await axios.post(
      URL_CONSTANTS.HOME_PAGE["CONTACT_US"],
      payload,
    );
  } catch (error) {
    console.log("error ", error);
  }
};
