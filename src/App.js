import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { connect, useDispatch } from 'react-redux';
import { validateAuthAction } from './redux/reducers/auth';
import { setSidebarVisibleAction } from './redux/reducers/pageState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PrivateRoute from './components/PrivateRoute';
import stateRegister from './register/stateRegister';
import { bindActionCreators } from 'redux';

import './css/App.css';
import './css/Input.css';
import 'esembico-common/dist/styles/css/CodeHighlighter.css';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

function App({ token, sidebarVisible, setSidebarVisible }) {
  const routes = stateRegister.getRoutes();
  const dispatch = useDispatch();
  dispatch(validateAuthAction());
  const showSidebar = (e) => {
    e.preventDefault();
    setSidebarVisible(true);
  };
  return (
    <Router>
      {token && (
        <React.Fragment>
          <Sidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
        </React.Fragment>
      )}
      <div className={token ? 'main' : ''}>
        <div className='show-sidebar'>
          <a onClick={showSidebar} href='#show-sidebar'>
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
        <Switch>
          <Route exact={true} path='/login' component={Login} />
          {routes.map((route) => {
            return (
              <PrivateRoute
                key={route.name}
                exact={true}
                path={route.path}
                component={route.component}
              />
            );
          })}
          <PrivateRoute exact={true} path='/' component={Home} />
          <PrivateRoute path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  const token = state.auth.token;
  const sidebarVisible = state.pageState.sidebarVisible;
  return { token, sidebarVisible };
};

const mapDispatchToProps = (dispatch) => {
  const setSidebarVisible = setSidebarVisibleAction;
  return bindActionCreators({ setSidebarVisible }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
