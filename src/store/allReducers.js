import {combineReducers} from 'redux';
import {globalReducer} from './globalReducer';
import {loginReducer} from '../screens/Login/redux/reducer';
import {homeReducer} from '../screens/Home/redux/reducer';
import {detailReducer} from '../screens/Detail/redux/reducer';

export const allReducers = combineReducers({
  global: globalReducer,
  login: loginReducer,
  home: homeReducer,
  detail: detailReducer,
});
