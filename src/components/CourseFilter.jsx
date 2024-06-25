// CourseFilter.js
import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

const CourseFilter = ({ categories, filters, setFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Title"
        name="title"
        value={filters.title}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        select
        label="Category"
        name="category"
        value={filters.category}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

    </Box>
  );
};

export default CourseFilter;
