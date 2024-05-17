import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";
import { Divider } from "@mui/material";
import '../App.css'
import ShareDialog from "./SharingDialog";
import SimpleSnackbar from "../components/common/SnackBar";
import { SNACKBAR_SEVERITY } from "../constants/common/all.constants";

export default function BlogCard({
  id,
  title,
  content,
  image,
  video,
  name,
  email,
  createdAt,
  updatedAat,
  likeCount,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] =React.useState(""); // State for Snackbar message
  const [severity, setSeverity] = React.useState(SNACKBAR_SEVERITY.SUCCESS);
  const navigate = useNavigate();
  const handleLikes = async () => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        navigate("/login");
        return;
      }

      const { data } = await axios.put(
        `${
          process.env.REACT_APP_ENVIRONMENT === "development"
            ? `${process.env.REACT_APP_DEV_URL}/blog/like/${id}`
            : `${process.env.REACT_APP_PROD_URL}/blog/like/${id}`
        }`,
        {},
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        },
      );

      if (data?.success) {
        setSeverity(SNACKBAR_SEVERITY.SUCCESS);
        setOpenSnackbar(true);
        setSnackbarMessage("Blog liked successful !");
        window.location.reload();
      }
      else{
        setSeverity(SNACKBAR_SEVERITY.ERROR);
        setOpenSnackbar(true);
        setSnackbarMessage(data.message);
      }
    } catch (error) {
      setSeverity(SNACKBAR_SEVERITY.ERROR);
      setOpenSnackbar(true);
      setSnackbarMessage(
        error.response.data.message || error.response.statusText,
      );
      console.log("User Error", error);
    }
  };

  const handleShareClick = () => {
    setShareOpen(true);
  };

  const handleCloseShare = () => {
    setShareOpen(false);
  };
  const shareUrl = window.location.href;


  return (
    <>
     <SimpleSnackbar 
        open={openSnackbar} 
        setOpen={setOpenSnackbar} 
        message={snackbarMessage} 
        severity={severity}
      />
      <Card
        sx={{
          width: "100%",
          maxHeight: "500px",
          margin: "auto",
          mt: 2,
          p: 1,
          boxShadow: "5px 5px 5px #ccc",
          ":hover": {
            boxShadow: "10px 10px 10px #ccc",
          },
        }}
      >
        <Link to={`/blog/${id}`}>
          <Typography
            variant="body2"
            color="primary"
            style={{
              fontSize: "1.2rem",
              letterSpacing: "0.1em",
              lineHeight: "1.5",
              marginTop: "10px",
              // marginBottom: "5px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              marginBottom: "15px",
            }}
          >
           <CalendarMonthIcon /> {createdAt}
          </Typography>
          <Chip
            icon={<EmailIcon />}
            label={"Email : " + `${email}`}
            color="primary"
            sx={{marginBottom:"10px"}}
          />
         
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
          />
          <CardContent sx={{padding: "0px", margin:"0px"}}>
            <Typography
              paragraph
              color="text.secondary"
              style={{
                overflow: "hidden", // Hide overflow content
                textOverflow: "ellipsis", // Show ellipsis for overflow content
                display: "-webkit-box",
                WebkitLineClamp: 3, // Limit to 5 lines of text
                WebkitBoxOrient: "vertical",
                paddingTop: "10px",
              }}
               
              dangerouslySetInnerHTML={{ __html: content }}
            >
              {/* {content} */}
            </Typography>
          </CardContent>
        </Link>
        <Divider />
        <CardHeader
            avatar={
              <FaceIcon />
            }
            title={`Written By 👉  ${name} `}
            sx={{padding:0}}
          />
        <CardActions disableSpacing>
          <span style={{ color: "red" }}> {likeCount ? likeCount : "0"}</span>

          <IconButton aria-label="add to favorites">
            <FavoriteIcon color="error" onClick={() => handleLikes()} />
          </IconButton>
          <IconButton aria-label="share" onClick={handleShareClick}>
            <ShareIcon />
          </IconButton>
        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph dangerouslySetInnerHTML={{ __html: content }}>
              {/* {content} */}
            </Typography>
          </CardContent>
        </Collapse>
      
      </Card>
      <ShareDialog
        open={shareOpen}
        onClose={handleCloseShare}
        url={shareUrl}
        title={title}
      /> 
    </>
  );
}
