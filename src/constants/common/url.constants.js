/* =======================================================  
    NOTE :- PLEASE ADD ALL URL LINK HERE , SPECIALLY API'S
======================================================== */

const baseURL = ""; // TODO setup
export const URL_CONSTANTS = {
  //page
  HOME_PAGE: {
    CONTACT_US: `${
      process.env.REACT_APP_ENVIRONMENT === "development"
        ? `${process.env.REACT_APP_DEV_URL}/user/contact-us`
        : `${process.env.REACT_APP_PROD_URL}/user/contact-us`
    }
        `,
  },
  COURSE_PAGE: {},
  BLOG_PAGE: {},
  AUTH_PAGE: {},
};
