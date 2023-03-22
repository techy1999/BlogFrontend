import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import axios from "axios";

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

  const handleLikes = async () => {
    try {
      //pass auth token and verify...
      const authToken = localStorage.getItem("token");
      console.log("handleLikes authToken", authToken, typeof authToken);
      const { data } = await axios.put(
        `https://fierce-teal-angelfish.cyclic.app/api/blog/like/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log("data for likes", data);
      if (data?.success) {
        alert("Blog liked successful !");
      }
    } catch (error) {
      console.log("User Error", error);
    }
  };

  return (
    <>
      <Link to={`/blog/${id}`}>
        <Card
          sx={{
            width: "50%",
            margin: "auto",
            mt: 2,
            padding: 2,
            boxShadow: "5px 5px 5px #ccc",
            ":hover": {
              boxShadow: "10px 10px 10px #ccc",
            },
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], fontSize: "15px" }}
                aria-label="recipe"
              >
                {name}
              </Avatar>
            }
            title={`${name} ${email}`}
            subheader={createdAt}
          />
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography paragraph color="text.primary">
              {content}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <span style={{ color: "red" }}> {likeCount ? likeCount : "0"}</span>

            <IconButton aria-label="add to favorites">
              <FavoriteIcon onClick={() => handleLikes()} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{content}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Link>
    </>
  );
}
