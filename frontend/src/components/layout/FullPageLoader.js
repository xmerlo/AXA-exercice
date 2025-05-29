import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const FullPageLoader = ({ isLoading }) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FullPageLoader;
