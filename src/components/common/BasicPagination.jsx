import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function BasicPagination({ page, onChange }) {
  const handlePageChange = (event, value) => {
    onChange(value); // Call 
  };

  return (
    <Stack spacing={2} mt={4}>
      <Pagination count={page} color="primary" onChange={handlePageChange} />
    </Stack>
  );
}

export default BasicPagination;
