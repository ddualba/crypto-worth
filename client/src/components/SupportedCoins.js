import React, { Fragment } from 'react';
import CoinList from 'components/CoinList';
import './SupportedCoins.scss';

const SupportedCoins = () => {
  return (
    <Fragment>
      <div className='coinpage'>
        <h1 className='coinpage__title'>Supported Coins</h1>
        <p className='coinpage__text'>
          We will continue to grow our list of supported coins.
        </p>
        <CoinList />
      </div>
    </Fragment>
  );
};

export default SupportedCoins;
