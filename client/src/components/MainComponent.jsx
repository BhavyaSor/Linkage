import React, { useEffect, useLayoutEffect } from 'react';
import { Box, useTheme } from '@material-ui/core';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from './Header/HeaderComponent';
import Home from './Home/HomeComponent';
import Linkage from './Linkage/Linkage';
import localStorageService from '../shared/localStorageService';
import { refreshUser } from '../redux/actions';

import '../styles/mainPage.css';

const MainComponent = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const path = props.location.pathname;
  const isCurrentPageHome = path === '/';
  const pageTitle =
    path.split('/')[1].split('-').join(' ').toUpperCase() || 'HOME';
  const primaryColor = useTheme().palette.primary.dark;
  const bgcolor = isCurrentPageHome ? primaryColor : null;

  useLayoutEffect(() => {
    dispatch(refreshUser());
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        style={{ minHeight: '100vh', backgroundColor: bgcolor }}
      >
        <Box>
          <NavBar
            elevation={isCurrentPageHome ? 0 : 12}
            pageTitle={pageTitle}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          flex={5}
          m={2}
        >
          <Switch location={props.location}>
            <Route path="/" exact component={Home} />
            <Route exact path="/linkage">
              <Redirect to="/linkage/my-linkage" />
            </Route>
            <Route path="/linkage/:l_id" component={Linkage} />
          </Switch>
        </Box>
      </Box>
    </>
  );
};

export default withRouter(MainComponent);
