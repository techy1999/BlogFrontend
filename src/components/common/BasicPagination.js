import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export  function BasicPagination(pageNumber) {
  console.log(
    "page", pageNumber.page
  );
    return (
      <Stack spacing={2} mt={4}>
        <Pagination count={pageNumber.page} color="primary" />
      </Stack>
    );
  }

  export default BasicPagination;