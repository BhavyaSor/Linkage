import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

const MoveLinkage = ({ open }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [path, setPath] = useState(['/']);

  return <Dialog fullScreen={fullScreen} open={open}></Dialog>;
};

export default MoveLinkage;
