import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// import Card from '../../shared/components/UIElements/Card';
// import Button from '../../shared/components/FormElements/Button';
// import { FaUser } from 'react-icons/fa';

import './RegisterLogin.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',

    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='register-page'>
        <h1 className='regform__title'>Register for an account</h1>

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
            />
            <label htmlFor='email' className='regform__label'>
              Email address - for login purposes only
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

          <div className='regform__group'>
            <input
              id='password2'
              required
              type='password'
              className='regform__input'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
              autoComplete='none'
            />
            <label htmlFor='password2' className='regform__label'>
              Confirm Password
            </label>
          </div>

          <button className='regform-btn' type='submit'>
            Register
          </button>

          <p className='regform__footer'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
