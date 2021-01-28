import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateAuthAction } from './redux/reducers/auth';
import PrivateRoute from './components/PrivateRoute';
import stateRegister from './register/stateRegister';
import { bindActionCreators } from 'redux';
import Base from './components/Base';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';

import './css/App.css';
import 'esembico-common/dist/styles/css/CodeHighlighter.css';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

function App({ validateAuth }) {
  const routes = stateRegister.getRoutes();
  validateAuth();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      })
    );
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <Router>
        <Base>
          <Switch>
            <Route exact={true} path='/login' component={Login} />
            {routes.map((route) => {
              return (
                <PrivateRoute
                  key={`${route.name}-list`}
                  exact={true}
                  path={route.listPath}
                  component={route.listComponent}
                />
              );
            })}
            {routes.map((route) => {
              return (
                <PrivateRoute
                  key={`${route.name}-edit`}
                  exact={true}
                  path={route.editPath}
                  component={route.editComponent}
                />
              );
            })}
            <PrivateRoute exact={true} path='/' component={Home} />
            <PrivateRoute path='*' component={NotFound} />
          </Switch>
        </Base>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  const validateAuth = validateAuthAction;
  return bindActionCreators({ validateAuth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
