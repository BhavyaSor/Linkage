import React from 'react';
import { Box, Typography, useTheme } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function Information({ message }) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flex={5}
      justifyContent="center"
      style={{ width: '100%' }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box display="flex" justifyContent="center">
          <InfoOutlinedIcon
            style={{ fontSize: 48 }}
            htmlColor={theme.palette.grey[600]}
          />
        </Box>
        <br />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {message.split('<br>').map((msg) => (
            <Typography
              variant="h5"
              component="h2"
              style={{ color: theme.palette.grey[600] }}
            >
              {msg}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Information;
