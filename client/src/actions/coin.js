import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_COIN,
  GET_COINS,
  GET_COIN,
  COIN_ERROR,
  DELETE_COIN,
  UPDATE_COIN,
  SET_CURRENT_COIN
} from './types';

// Get Coins
export const getCoins = () => async dispatch => {
  try {
    const res = await axios.get('/api/coins');

    dispatch({
      type: GET_COINS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Coin by ID
export const getCoinById = coinId => async dispatch => {
  console.log('attempt get coinbyID');
  console.log(coinId);
  try {
    const res = await axios.get(`/api/coins/${coinId}`);

    console.log('response from client route');
    console.log(res);

    dispatch({
      type: GET_COIN,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Coin
// export const addCoin = formData => async dispatch => {
export const addCoin = ({
  symbol,
  name,
  exchange,
  quantity,
  history
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ symbol, name, exchange, quantity });

  try {
    // const res = await axios.post('/api/coins/', formData, config);
    const res = await axios.post('/api/coins/', body, config);

    dispatch({
      type: ADD_COIN,
      payload: res.data
    });

    history.push('/dashboard');
    dispatch(setAlert('Coin added', 'info'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// set current coin
export const setCurrentCoin = _id => dispatch => {
  // console.log('id is:' + _id);
  dispatch({
    type: SET_CURRENT_COIN,
    payload: { id: _id }
  });
};

// Edit Coin
export const updateCoin = (coinId, exchange, quantity) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ exchange, quantity });

  try {
    const res = await axios.patch(`/api/coins/${coinId}`, body, config);

    dispatch({
      type: UPDATE_COIN,
      payload: res.data
    });

    dispatch(setAlert('Coin updated', 'info'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Delete coin
export const deleteCoin = id => async dispatch => {
  // confirm delete modal first

  try {
    await axios.delete(`/api/coins/${id}`);

    dispatch({
      type: DELETE_COIN,
      payload: id
    });
    // dispatch(setAlert('Coin Removed', 'success'));
  } catch (err) {
    dispatch({
      type: COIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
