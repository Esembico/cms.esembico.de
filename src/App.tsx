import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateAuthAction } from './redux/reducers/auth';
import PrivateRoute from './components/PrivateRoute';
import stateRegister from './register/stateRegister';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Base from './components/Base';
import AlertDisplay from './components/AlertDisplay';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { AppProps } from './types/App';
import { getThemeName } from './redux/reducers/selectors/pageState';

import './css/App.css';
import 'esembico-common/dist/styles/css/CodeHighlighter.css';

import Home from './pages/Home';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { ReduxStore } from './redux/reducers/types/base';

function App({ validateAuth, themeName }: AppProps) {
  const routes = stateRegister.getRoutes();
  validateAuth();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createMuiTheme({
        palette: {
          type:
            themeName === 'system'
              ? prefersDarkMode
                ? 'dark'
                : 'light'
              : themeName
        }
      })
    );
  }, [prefersDarkMode, themeName]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <Router>
        <Base>
          <AlertDisplay />
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
            <PrivateRoute exact={true} path='/settings' component={Settings} />
            <PrivateRoute exact={true} path='/' component={Home} />
            <PrivateRoute path='*' component={NotFound} />
          </Switch>
        </Base>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: ReduxStore) => {
  const themeName = getThemeName(state);
  return {
    themeName
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  const validateAuth = validateAuthAction;
  return bindActionCreators({ validateAuth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
