import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
  return (
    <Box marginBottom="auto" marginTop="auto">
      <img
        src="assets/404.svg"
        style={{ width: '100%', maxHeight: '250px' }}
        alt="404drawing"
      />

      <Typography align="center" style={{ marginTop: '24px' }}>
        We can't find the page you're looking for! {'   '}
        <Typography component={Link} to="/" color="secondary">
          Find me way
        </Typography>
      </Typography>
    </Box>
  );
};

export default NotFound404;
