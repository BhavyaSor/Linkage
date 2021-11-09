import React from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ItemLinkage from './ItemLinkage';
import LoadingComponent from '../Utils/LoadingComponent';

const LinkageContainer = (props) => {
  const linkage = useSelector((state) => state.linkage);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <>
      {linkage.loading ? (
        <LoadingComponent />
      ) : linkage.linkages ? (
        <Grid container justify="flex-start" spacing={3}>
          {linkage.linkages.map((linkage, idx) => {
            return (
              <Grid
                item
                container
                justify={isSmallScreen ? 'center' : 'flex-start'}
                xs={12}
                sm={6}
                md={3}
                key={idx}
              >
                <ItemLinkage linkage={linkage} {...props} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <h1>{linkage.error}</h1>
      )}
    </>
  );
};

export default LinkageContainer;
