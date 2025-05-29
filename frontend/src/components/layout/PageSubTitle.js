import React from 'react';
import { Typography } from '@mui/material';

const PageSubTitle = ({ children }) => {
  return (
    <Typography
      variant="h5"
      gutterBottom
      sx={{ color: "primary.main", textAlign: 'left' }}
    >
      {children}
    </Typography>
  );
};

export default PageSubTitle;