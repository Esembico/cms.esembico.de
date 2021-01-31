import React, { useEffect, useReducer } from 'react';
import { getAlerts } from '../redux/reducers/selectors/alert';
import { removeAlertAction } from '../redux/reducers/alert';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AlertDisplayProps } from './types/components';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    marginBottom: theme.spacing(1)
  }
}));

const AlertDisplay = ({ alerts, removeAlert }: AlertDisplayProps) => {
  const classes = useStyles();
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    if (Object.keys(alerts).length !== 0) {
      setInterval(() => {
        let hasDeletedAlert = false;
        Object.entries(alerts).forEach(([id, alert]) => {
          const age = Date.now() - (alert.timestamp ?? 0);
          if (age >= 5000) {
            removeAlert(id);
            hasDeletedAlert = true;
          }
        });
        if (hasDeletedAlert) {
          forceUpdate();
        }
      }, 1000);
    }
  }, [alerts]);
  return (
    <div className={classes.root}>
      {Object.entries(alerts).map(([id, alert]) => {
        return (
          <Alert
            key={id}
            variant='outlined'
            severity={alert.severity}
            onClose={() => {
              removeAlert(id);
              forceUpdate();
            }}
          >
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            {alert.message}
          </Alert>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const alerts = getAlerts(state);
  return { alerts };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({ removeAlert: removeAlertAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDisplay);
