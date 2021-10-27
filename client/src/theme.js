import { createMuiTheme } from '@material-ui/core';
import './index.css';

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#98C1D9',
      main: '#3D5A80',
      dark: '#293241',
      contrastText: '#E0FBFC',
    },
    secondary: {
      main: '#EE6C4D',
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', 'sans-serif'].join(','),
  },
});
appTheme.typography.h5 = {
  fontSize: '1.5rem',
  '@media (max-width:400px)': {
    fontSize: '1.2rem',
  },
};
