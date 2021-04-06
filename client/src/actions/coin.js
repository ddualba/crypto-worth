import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { ADD_COIN, GET_COINS, UPDATE_COIN, DELETE_COIN } from './types';

// Add Coin
// export const addCoin = formData => async dispatch => {
export const addCoin = ({ exchange, symbol, name }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ exchange, symbol, name });

  try {
    // const res = await axios.post('/api/coin/', formData, config);
    const res = await axios.post('/api/coin/', body, config);

    dispatch({
      type: ADD_COIN,
      payload: res.data
    });

    // TODO [ ] dispatch alert - success
    // dispatch(setAlert('Coin added', 'info'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
