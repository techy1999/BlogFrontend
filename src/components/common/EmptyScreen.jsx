import React from "react";
import { Box, Typography } from "@mui/material";
const EmptyScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        padding: "20px",
      }}
    >
      <Typography fontSize={20} textAlign="center">
        No data available
      </Typography>
    </Box>
  );
};

export default EmptyScreen;
