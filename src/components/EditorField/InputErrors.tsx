import { makeStyles } from '@material-ui/core';
import React from 'react';
import { InputErrorsProps } from '../types/components';

const useStyles = makeStyles((theme) => {
  return {
    error: {
      color: theme.palette.error.main
    }
  };
});

export default function InputErrors({ errors }: InputErrorsProps): JSX.Element {
  const classes = useStyles();

  return (
    <React.Fragment>
      {errors && (
        <React.Fragment>
          {errors.map((error, i) => {
            return (
              <span className={classes.error} key={i}>
                {error}
              </span>
            );
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
