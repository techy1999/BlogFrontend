// CourseCategory.js
import React, { useState } from 'react';
import { CssBaseline, Box, Container, Grid } from '@mui/material';
import CourseCard from '../../components/CourseCard';
import CourseFilter from '../../components/CourseFilter';

const COURSES_CATEGORY_LIST = [
  {id:1, image: "https://w7.pngwing.com/pngs/46/626/png-transparent-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template-blue.png", title: "C++ for beginner", description: "This is basic beginner course for the user to use it.", date: "04/07/2024", author: "sudhanshu", category: "C++" },
  {id:2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-d6UfUk2wXOKauTqOgL8Usfnc9i7eNBD8_Q&s", title: "Python for beginner", description: "This is basic beginner course for the user to use it.", author: "Ramauli", category: "Python", date: "03/03/2024" },
  {id:3, image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Blockchain_tutorial.jpg", description: "This is basic beginner course to learn about different concept in blockchain creating contract and interacting with contract.", title: "Blockchain for beginner", author: "John de cappa", date: "01/06/2024", category: "C++" },
  {id:4, image: "https://miro.medium.com/v2/resize:fit:1400/1*BQZAbczBfLYtPp-6HmN0ZQ.jpeg", description: "This is basic beginner course for deep into nextjs concepts..", title: "Nextjs for beginner", author: "Devid lamma", date: "04/03/2024", category: "Next.js" },
];

const CourseCategory = () => {
  const [filters, setFilters] = useState({
    title: '',
    category: '',
  });

  const categories = Array.from(new Set(COURSES_CATEGORY_LIST.map(course => course.category)));

  const filteredCourses = COURSES_CATEGORY_LIST.filter((course) => {
    return (
      (filters.title === '' || course.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.category === '' || course.category === filters.category) 
    );
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Container sx={{ mt: 2, ml: 32 }}>
        <CourseFilter
          categories={categories}
          filters={filters}
          setFilters={setFilters}
        />
        <Grid container spacing={3}>
          {filteredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseCategory;
