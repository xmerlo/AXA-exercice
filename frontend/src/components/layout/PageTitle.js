import React from 'react';
import { Typography } from '@mui/material';

const PageTitle = ({ children }) => {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{ color: "primary.main", textAlign: 'left' }}
    >
      {children}
    </Typography>
  );
};

export default PageTitle;