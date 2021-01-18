import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ token, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}

const mapStateToProps = (state) => {
  const token = state.auth.token;
  return { token };
};

export default connect(mapStateToProps)(PrivateRoute);
