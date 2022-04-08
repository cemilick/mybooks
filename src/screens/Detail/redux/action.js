import axios from 'axios';
import {BASE_URL} from '../../../helpers/apiAccess';
import toIDR from '../../../helpers/toIDR';
import {setLoading} from '../../../store/globalAction';

export const getDetailBooks = (id, token) => async dispatch => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  try {
    dispatch(setLoading(true));
    const result = await axios.get(`${BASE_URL}/books/${id}`);
    dispatch(setDetailBooks(result.data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setDetailBooks = payload => {
  return {
    type: 'SET_DETAIL_BOOKS',
    payload: payload,
  };
};
