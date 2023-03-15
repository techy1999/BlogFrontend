import * as React from "react";
import { styled } from "@mui/material/styles";
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
import TextField from "@mui/material/TextField";
export default function BlogCard({
  title,
  content,
  image,
  video,
  name,
  email,
  createdAt,
  updatedAat,
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
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
      />
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
        <CardMedia
          component="img"
          height="194"
          video={video}
          alt="Paella dish"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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
    </>
  );
}
