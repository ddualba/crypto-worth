import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import landingImage from '../../img/altcoins.jpg'
import './Landing.scss';

const Landing = ({ isAuthenticated }) => {
  // if (isAuthenticated) {
  // 	return <Redirect to="/dashboard" />;
  // }

  return (
    <main>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Coin Worth</h1>
            <p className='lead'>
              Add your coins, check their worth. Track your value across muliple
              exchanges and wallets.
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
