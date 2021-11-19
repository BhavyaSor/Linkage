import React, { useState, memo, useImperativeHandle } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const SlideUpTransition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Notification = React.forwardRef((props, ref) => {
  const [config, setConfig] = useState({
    isOpen: false,
    severity: null,
    message: null,
  });

  useImperativeHandle(ref, () => ({
    notify: (severity, message) => {
      setConfig({
        isOpen: true,
        severity,
        message,
      });
    },
  }));

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setConfig((state) => ({
      ...state,
      isOpen: false,
    }));
  };

  return (
    <Snackbar
      open={config.isOpen}
      autoHideDuration={2000}
      onClose={handleAlertClose}
      TransitionComponent={SlideUpTransition}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleAlertClose}
        severity={config?.severity ?? 'info'}
      >
        {config?.message ?? 'Information'}
      </MuiAlert>
    </Snackbar>
  );
});

export default memo(Notification);
