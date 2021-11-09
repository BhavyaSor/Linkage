import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { appTheme } from './theme';
import { ConfigureStore } from './redux/ReduxStore';
import Notification from './components/Utils/Notification';
import { UtilContext } from './components/Utils/UtilContext';

const store = ConfigureStore();

function App() {
  const [themeType, setThemeType] = React.useState('light');
  const darkModePreferred = useMediaQuery('(prefers-color-scheme:dark)');

  useEffect(() => {
    if (darkModePreferred) {
      setThemeType('dark');
    }
  }, [darkModePreferred]);

  const theme = React.useMemo(() => appTheme(themeType), [themeType]);
  const notificationRef = React.useRef();
  const utils = {
    notificationRef,
    themeing: { themeType, setThemeType },
  };
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <UtilContext.Provider value={utils}>
          <CssBaseline />
          <BrowserRouter>
            <MainComponent isHome="true" setTheme={setThemeType} />
          </BrowserRouter>
          <Notification ref={notificationRef} />
        </UtilContext.Provider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
