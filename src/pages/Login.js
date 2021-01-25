import { useState } from 'react';
import Container from '../components/Responsive/Container';
import { connect } from 'react-redux';
import { authAction } from '../redux/reducers/auth';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const Login = ({ auth, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth(username, password);
  };
  return (
    <Container>
      {token && <Redirect to='/' />}
      <TextField
        fullWidth
        label='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      >
        Login
      </Button>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const token = state.auth.token;
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  const auth = authAction;
  return bindActionCreators({ auth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
