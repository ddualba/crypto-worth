import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from 'actions/auth';

import './Header.scss';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='navigation__list'>
      <li className='navigation__item'>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li className='navigation__item'>
        <Link to='/coins'>Coins</Link>
      </li>
      <li className='navigation__item'>
        <Link onClick={logout} to='#!'>
          Sign Out
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navigation__list'>
      <li className='navigation__item'>
        <Link to='/coins'>Coins</Link>
      </li>
      <li className='navigation__item'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='navigation__item'>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <header className='main-header'>
      <nav className='navigation__nav'>
        <h1 className='navigation__logo'>
          <Link to='/'>/@/ Coin Worth</Link>
        </h1>
        {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </nav>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
