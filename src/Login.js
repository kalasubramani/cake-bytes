import React, { useState,} from 'react';
import Register from './Register';
import { Link } from 'react-router-dom';

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });      
    }
    catch(ex){
      console.log(ex.response.data);
    }
  }
  return (
    <div className="loginContainer">
      <form onSubmit={ _login }>
        <label className='loginLabels'>Username or email address</label>
        <input
          placeholder='username'
          value={ username }
          onChange={ ev => setUsername(ev.target.value)}
          className='loginform'
        />
        <label className='loginLabels'>Password</label>
        <input
          type='password'
          placeholder='password'
          value={ password }
          onChange={ ev => setPassword(ev.target.value)}
          className='loginform'
        />
        <button disabled={!username || !password} className='loginform'>Login</button>
      </form>
      {/* Add Register LINK */}
      Are you a new user? Get Started <Link to='/register'>here</Link>!
    </div>
  );
}

export default Login;
