import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '../../components/common/CustomizedAccordions'; // Adjust the path as needed
import { Typography, Button, TextField, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

const CourseContent = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [comments, setComments] = useState({});
  const [currentComment, setCurrentComment] = useState('');

  const lessons = [
    { id: 1, title: 'Lesson 1', videoUrl: 'https://www.taxmann.com/emailer/images/CompaniesAct.mp4', description: 'C++ variable and function definition1' },
    { id: 2, title: 'Lesson 2', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', description: 'Construction function and its uses' },
    { id: 3, title: 'Lesson 3', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', description: 'Writing simple code and editor setup' },
    { id: 4, title: 'Lesson 4', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', description: 'DSA use case in cpp' },
    { id: 5, title: 'Lesson 5', videoUrl: 'https://www.taxmann.com/emailer/images/FEMA.mp4', description: 'Error handling ' },
    { id: 6, title: 'Lesson 6', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', description: 'Object orient stle of coding' },
    { id: 7, title: 'Lesson 7', videoUrl: 'https://www.taxmann.com/emailer/images/FEMA.mp4', description: 'Writing class based methods and other properties.' },
    // Add more lessons as needed
  ];

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCommentSubmit = () => {
    if (currentComment) {
      setComments({
        ...comments,
        [selectedLesson.id]: [...(comments[selectedLesson.id] || []), currentComment]
      });
      setCurrentComment('');
    }
  };

  return (
    <Box margin={2}> {/* Outer Box for spacing */}
      <Box display="flex" className="container">
        <Box width="300px" mr={2}> {/* Added right margin */}
          <Typography variant="h6" gutterBottom>Lessons</Typography>
          {lessons.map((lesson) => (
            <Accordion key={lesson.id} onChange={() => handleLessonClick(lesson)}>
              <AccordionSummary>
                <Typography>{lesson.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{lesson.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box flex={1} padding={2}>
          {selectedLesson ? (
            <Box>
              <Typography variant="h4" gutterBottom>{selectedLesson.title}</Typography>
              <video width="100%" controls>
                <source src={selectedLesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Typography variant="body1" gutterBottom>{selectedLesson.description}</Typography>
              <Button variant="contained" color="primary" href={selectedLesson.videoUrl} target="_blank" style={{ marginBottom: '20px' }}>
                Source File
              </Button>
              <Typography variant="h6">Comments</Typography>
              <List>
                {(comments[selectedLesson.id] || []).map((comment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={comment} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <TextField
                label="Add a comment"
                fullWidth
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                variant="outlined"
                style={{ marginBottom: '20px' }}
              />
              <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                Submit
              </Button>
            </Box>
          ) : (
            <Typography variant="h5">Select a lesson to view the content</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CourseContent;
