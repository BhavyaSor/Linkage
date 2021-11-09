import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import MainComponent from './components/MainComponents';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { appTheme } from './theme';
import { ConfigureStore } from './redux/ReduxStore';
const store = ConfigureStore();

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <BrowserRouter>
          <MainComponent isHome="true" />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
