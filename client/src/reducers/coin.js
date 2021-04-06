import {
  ADD_COIN,
  GET_COINS,
  UPDATE_COIN,
  DELETE_COIN
} from '../actions/types';

const initialState = {
  coins: null
};

const coinReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COIN:
      return {
        ...state,
        loading: false,
        coins: payload
      };

    default:
      return state;
  }
};

export default coinReducer;
