import {Alert} from 'react-native';
import {setLoading} from '../../../store/globalAction';

import {BASE_URL} from '../../../helpers/apiAccess';
import axios from 'axios';

export const setToken = payload => {
  return {
    type: 'SET_TOKEN',
    payload: payload,
  };
};

export const setName = payload => {
  return {
    type: 'SET_NAME',
    payload: payload,
  };
};

const regexEmail = new RegExp('[A-Za-z0-9 _ -.]+[@][A-Za-z0-9]+[.][A-za-z.]+');

export const login = (email, password, navigation) => async dispatch => {
  if (!email || !password) {
    Alert.alert('Warning', 'Please complete the Email and Password!');
  } else if (!regexEmail.test(email)) {
    Alert.alert('Warning', 'Please use valid Email only!');
  } else {
    const body = {
      email: email,
      password: password,
    };
    try {
      dispatch(setLoading(true));
      const result = await axios.post(`${BASE_URL}/auth/login`, body, {
        validateStatus: status => status < 501,
      });
      if (result.status === 200) {
        console.log(result.data.tokens.access.token);
        dispatch(setToken(result.data.tokens.access.token));
        dispatch(setName(result.data.user.name));
        navigation.navigate('Home');
      } else {
        Alert.alert('Failed', 'Login Failed, Try Again');
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
};
