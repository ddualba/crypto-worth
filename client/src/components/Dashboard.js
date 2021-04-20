import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Coins from './coins/Coins';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <Fragment>
      <section className='dashboard__heading'>
        <h1>Crypto Worth Dashboard</h1>
        <h3>Details on your coin's worth</h3>
        <p>
          No coins, then <Link to='/add-coin'>Add a Coin</Link>
        </p>
      </section>
      <Coins />
    </Fragment>
  );
};

export default Dashboard;
