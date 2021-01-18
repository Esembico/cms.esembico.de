import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { connect } from "react-redux";

import "./css/App.css";
import "./css/Material.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Recommendations from "./pages/Recommendations";
import Team from "./pages/Team";
import Images from "./pages/Images";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App({ token }) {
  return (
    <Router>
      {token && <Sidebar />}
      <div className={token ? "main" : ""}>
        <Switch>
          <Route exact={true} path="/login" component={Login} />
          <PrivateRoute exact={true} path="/team" component={Team} />
          <PrivateRoute
            exact={true}
            path="/recommendations"
            component={Recommendations}
          />
          <PrivateRoute exact={true} path="/images" component={Images} />
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
