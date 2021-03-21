import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const FullPageSpinner = () => {
  return (
    <Box
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default FullPageSpinner;
