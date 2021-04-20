import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCoin } from '../../actions/coin';

import './CoinForm.scss';

const CoinForm = ({ addCoin, history }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    exchange: '',
    quantity: ''
  });

  const { exchange, symbol, name, quantity } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addCoin({ symbol, name, exchange, quantity, history });
  };

  return (
    <Fragment>
      <div className='coinform-page'>
        <h1 className='coinform__title'>Add coin form</h1>

        <form onSubmit={e => onSubmit(e)} className='coinform'>
          <div className='coinform__group'>
            <input
              id='symbol'
              required
              type='text'
              className='coinform__input'
              placeholder='Coin symbol'
              name='symbol'
              value={symbol}
              onChange={e => onChange(e)}
            />
            <label htmlFor='symbol' className='coinform__label'>
              Coin Symbol
            </label>
          </div>

          <div className='coinform__group'>
            <input
              id='name'
              required
              type='text'
              className='coinform__input'
              placeholder='Coin name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
            />
            <label htmlFor='name' className='coinform__label'>
              Coin name
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
            Add Coin
          </button>
        </form>
      </div>
    </Fragment>
  );
};

CoinForm.propTypes = {
  addCoin: PropTypes.func.isRequired
};

export default connect(null, { addCoin })(withRouter(CoinForm));
