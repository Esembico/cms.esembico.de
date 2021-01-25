import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function Header({ children }) {
  return (
    <React.Fragment>
      <Typography variant='h3'>{children}</Typography>
      <hr />
    </React.Fragment>
  );
}
