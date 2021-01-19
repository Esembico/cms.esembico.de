import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { connect } from "react-redux";

import "./css/App.css";
import "./css/Material.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import stateRegister from "./register/StateRegister";

function App({ token }) {
  const routes = stateRegister.getRoutes();
  return (
    <Router>
      {token && <Sidebar />}
      <div className={token ? "main" : ""}>
        <Switch>
          <Route exact={true} path="/login" component={Login} />
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
          <PrivateRoute exact={true} path="/" component={Home} />
          <PrivateRoute path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  const token = state.auth.token;
  return { token };
};

export default connect(mapStateToProps)(App);
