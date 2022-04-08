import axios from 'axios';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../helpers/apiAccess';
import {store} from '../../../store';
import {setLoading} from '../../../store/globalAction';

const {token} = store.getState().login;
console.log(token, 'token nih');

axios.defaults.headers.Authorization = `Bearer ${token}`;

export const getRecommendedBooks = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const result = await axios.get(`${BASE_URL}/books`);
    console.log(result);

    if (result.status === 200) {
      return dispatch(setRecommendedBooks(result.data.results));
    } else {
      Alert.alert(`Failed`, result.data.message);
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setRecommendedBooks = payload => {
  return {
    type: 'SET_RECOMMENDED_BOOKS',
    payload: payload,
  };
};
