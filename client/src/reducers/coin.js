import {
  ADD_COIN,
  COIN_ERROR,
  GET_COINS,
  GET_COIN,
  DELETE_COIN,
  UPDATE_COIN,
  SET_CURRENT_COIN
} from '../actions/types';

const initialState = {
  coins: [], // all coins for a user
  currentCoin: {}, // all data for specific coin
  loading: true,
  error: {}
};

const coinReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COIN:
      return {
        ...state,
        coins: [payload, ...state.coins],
        loading: false
      };
    case GET_COINS:
      return {
        ...state,
        coins: payload,
        loading: false
      };
    case GET_COIN:
      return {
        ...state,
        currentCoin: payload,
        loading: false
      };
    case COIN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_COIN:
      return {
        ...state,
        coins: state.coins.filter(coin => coin._id !== payload),
        loading: false
      };
    case UPDATE_COIN:
      return {
        ...state,
        // coins: [state.coins.filter(coin => coin._id !== payload), payload],
        coins: state.coins.map(coin =>
          coin._id === payload.id ? payload : coin
        ),
        loading: false
      };
    case SET_CURRENT_COIN:
      return {
        ...state,
        // currentCoin: state.coins.map(coin => coin._id === payload._id),
        currentCoin: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default coinReducer;
