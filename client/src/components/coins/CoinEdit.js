import React, { Fragment, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoinById, updateCoin } from '../../actions/coin';

import './CoinForm.scss';

const CoinEdit = ({
  coin: { currentCoin, loading },
  getCoinById,
  updateCoin,
  history
}) => {
  const [formData, setFormData] = useState({
    exchange: '',
    quantity: ''
  });
  let params = useParams();
  const myCoinId = params.coinId;

  useEffect(
    () => {
      getCoinById(myCoinId);

      setFormData({
        exchange: loading || !currentCoin.exchange ? '' : currentCoin.exchange,
        quantity: loading || !currentCoin.quantity ? '' : currentCoin.quantity
      });
    },
    // eslint-disable-next-line
    [loading, getCoinById, exchange, quantity]
  );

  const { exchange, quantity } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateCoin({ myCoinId, exchange, quantity, history });
  };

  return (
    <Fragment>
      <div className='coinform-page'>
        <h1 className='coinform__title'>Update coin form</h1>

        <form onSubmit={e => onSubmit(e)} className='coinform'>
          <div className='coinform__group'>
            <label htmlFor='symbol' className='coinform__label'>
              Coin Symbol: {currentCoin.symbol}
            </label>
          </div>

          <div className='coinform__group'>
            <label htmlFor='name' className='coinform__label'>
              Coin name: {currentCoin.name}
            </label>
          </div>

          <div className='coinform__group'>
            <input
              id='exchange'
              required
              type='text'
              className='coinform__input'
              placeholder='Exchange or wallet name'
              name='exchange'
              value={exchange}
              onChange={e => onChange(e)}
            />
            <label htmlFor='exchange' className='coinform__label'>
              Exchange/Wallet Name
            </label>
          </div>

          <div className='coinform__group'>
            <input
              id='quantity'
              required
              type='number'
              min='0'
              className='coinform__input'
              placeholder='Quantity'
              name='quantity'
              value={quantity}
              onChange={e => onChange(e)}
            />
            <label htmlFor='quantity' className='coinform__label'>
              Quantity
            </label>
          </div>

          <button className='coinform-btn' type='submit'>
            Update Coin
          </button>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  coin: state.coin
});

CoinEdit.propTypes = {
  updateCoin: PropTypes.func.isRequired,
  getCoinById: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getCoinById, updateCoin })(
  withRouter(CoinEdit)
);
