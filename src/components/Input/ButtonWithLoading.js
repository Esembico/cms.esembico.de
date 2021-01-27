import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function ButtonWithLoading({
  disabled,
  loading,
  children,
  ...props
}) {
  const classes = useStyles();
  return (
    <Button {...props} disabled={disabled || loading}>
      {children}
      {loading && (
        <CircularProgress className={classes.buttonProgress} size={24} />
      )}
    </Button>
  );
}
