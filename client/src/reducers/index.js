import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import coin from './coin';

export default combineReducers({
  alert,
  auth,
  coin
});
