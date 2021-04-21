import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCoin } from '../../actions/coin';
import { useFormik } from 'formik';

import './CoinForm.scss';

const CoinForm = ({ addCoin, history }) => {
  const formik = useFormik({
    initialValues: {
      symbol: '',
      name: '',
      exchange: '',
      quantity: ''
    },
    onSubmit: values => {
      handleSubmit(values);
    }
  });

  const handleSubmit = values => {
    const { symbol, name, exchange, quantity } = values;
    addCoin({ symbol, name, exchange, quantity, history });
  };

  return (
    <Fragment>
      <div className='coinform-page'>
        <h1 className='coinform__title'>Add coin form</h1>

        <form onSubmit={formik.handleSubmit} className='coinform'>
          <div className='coinform__group'>
            <input
              id='symbol'
              required
              type='text'
              className='coinform__input'
              placeholder='Coin symbol'
              name='symbol'
              value={formik.values.symbol}
              onChange={formik.handleChange}
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
              value={formik.values.name}
              onChange={formik.handleChange}
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
              value={formik.values.exchange}
              onChange={formik.handleChange}
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
              value={formik.values.quantity}
              onChange={formik.handleChange}
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
