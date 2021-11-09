import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import MainComponent from './components/MainComponents';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { appTheme } from './theme';
import { ConfigureStore } from './redux/ReduxStore';
import Notification, {
  NotificationContext,
} from './components/Utils/Notification';
const store = ConfigureStore();

function App() {
  const notificationRef = React.useRef();
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={appTheme}>
        <NotificationContext.Provider value={notificationRef}>
          <CssBaseline />
          <BrowserRouter>
            <MainComponent isHome="true" />
          </BrowserRouter>
          <Notification ref={notificationRef} />
        </NotificationContext.Provider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
