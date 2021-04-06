import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

import './RegisterLogin.scss';

const Login = ({ login, isAuthenticated, alerts }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='register-page'>
        <h1 className='regform__title'>Sign into your account</h1>

        <form onSubmit={e => onSubmit(e)} className='regform'>
          <div className='regform__group'>
            <input
              id='email'
              required
              type='email'
              className='regform__input'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              autoComplete='none'
            />
            <label htmlFor='email' className='regform__label'>
              Email address
            </label>
          </div>

          <div className='regform__group'>
            <input
              id='password'
              required
              type='password'
              className='regform__input'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              autoComplete='none'
            />
            <label htmlFor='password' className='regform__label'>
              Password
            </label>
          </div>

          <button
            disabled={alerts.length > 0}
            className='btn btn-primary regform-btn'
            type='submit'
          >
            Sign in
          </button>

          <p className='regform__footer'>
            Don't have an account yet? <Link to='/register'>Sign Up</Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert
});

export default connect(mapStateToProps, { login })(Login);
