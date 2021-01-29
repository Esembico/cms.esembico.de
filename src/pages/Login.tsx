import { useState, FormEvent } from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { authAction } from '../redux/reducers/auth';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { LoginProps } from './types/pages';

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  };
});

const Login = ({ auth, token }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    auth(username, password);
  };
  return (
    <Container>
      {token && <Redirect to='/' />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Login</Typography>
        <form onSubmit={onLogin}>
          <TextField
            label='Username'
            id='username'
            variant='outlined'
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            margin='normal'
            autoComplete='username'
          />
          <TextField
            label='Password'
            id='password'
            type='password'
            variant='outlined'
            fullWidth
            required
            margin='normal'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: { auth: { token: string | null } }) => {
  const token = state.auth.token;
  return { token };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  const auth = authAction;
  return bindActionCreators({ auth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
