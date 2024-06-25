// CourseCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Author: {course.author}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
};

export default CourseCard;
