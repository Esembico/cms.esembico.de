import React from 'react';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { HeaderProps } from './types/components';

export default function Header({
  children,
  loading
}: HeaderProps): JSX.Element {
  return (
    <React.Fragment>
      <Typography variant='h3'>{children}</Typography>
      {loading ? <LinearProgress /> : <hr />}
    </React.Fragment>
  );
}
