import { createTheme } from '@material-ui/core';
import './index.css';

export const appTheme = (theme) =>
  createTheme({
    palette: {
      type: theme || 'light',
      primary: {
        light: '#98C1D9',
        main: '#3D5A80',
        dark: '#293241',
      },
      secondary: {
        main: '#EE6C4D',
      },
    },
    typography: {
      fontFamily: ['"Montserrat"', 'sans-serif'].join(','),
    },
  });
