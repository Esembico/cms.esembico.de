import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRouteProps } from './types/components';

function PrivateRoute({
  token,
  component: Component,
  ...rest
}: PrivateRouteProps): JSX.Element {
  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    />
  );
}

const mapStateToProps = (state: { auth: { token: string | null } }) => {
  const token = state.auth.token;
  return { token };
};

export default connect(mapStateToProps)(PrivateRoute);
