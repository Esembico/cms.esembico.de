import React from 'react';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Header({ children, loading }) {
  return (
    <React.Fragment>
      <Typography variant='h3'>{children}</Typography>
      {loading ? <LinearProgress /> : <hr />}
    </React.Fragment>
  );
}
