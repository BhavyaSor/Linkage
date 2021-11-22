import React from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
const HomeComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      display="flex"
      flexDirection={isSmall ? 'column' : 'row'}
      style={{ flex: 1 }}
    >
      <Box marginTop="auto" marginBottom="auto">
        <img
          src="assets/linkage.svg"
          alt="Linkage Icon"
          style={{
            width: '100%',
            maxHeight: isSmall ? '200px' : '300px',
            flex: 2,
          }}
        />
      </Box>
      <Box
        style={{ flex: 3 }}
        marginTop={isSmall ? '24px' : 'auto'}
        marginBottom="auto"
      >
        <Typography
          variant="h3"
          align={isSmall ? 'center' : 'left'}
          color="secondary"
        >
          Linkage
        </Typography>
        <Typography
          align={isSmall ? 'center' : 'left'}
          variant="subtitle1"
          color="textSecondary"
          style={{ marginBottom: '18px' }}
        >
          Links and Notes Management System
        </Typography>
        <Typography
          align="justify"
          variant="body2"
          paragraph={true}
          color="textSecondary"
        >
          Create links and notes. Everything getting clumsy ? Easily categorize
          your linkages. Manage and move linkages into categories effortlessly.
        </Typography>

        <Typography
          align="justify"
          variant="body2"
          paragraph={true}
          color="textSecondary"
        >
          Wanna share your work to a friend ? We got you covered. Quickly share
          to your friends. Showcase your work to world by making your linkage
          public. Let us handle the permissions!
        </Typography>
        <Typography align={isSmall ? 'center' : 'left'}>
          <Button
            component={RouterLink}
            to="/linkage"
            color="secondary"
            variant="contained"
            style={{ marginTop: '24px' }}
          >
            Try It Now!
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeComponent;
