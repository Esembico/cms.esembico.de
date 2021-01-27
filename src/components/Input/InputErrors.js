import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => {
  return {
    error: {
      color: theme.palette.error.main
    }
  };
});

export default function InputErrors({ errors }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {errors && (
        <React.Fragment>
          {Array.isArray(errors) ? (
            <React.Fragment>
              {errors.map((error, i) => {
                return (
                  <span className={classes.error} key={i}>
                    {error}
                  </span>
                );
              })}
            </React.Fragment>
          ) : (
            <span className={classes.error}>{errors}</span>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
