import axios from 'axios';
import {Alert} from 'react-native';
import {setLoading} from '../../../store/globalAction';
import {BASE_URL} from '../../helpers/apiAccess';

export const Registration =
  ({email, password, fullname}) =>
  async dispatch => {
    const body = {
      email: email,
      password: password,
      name: fullname,
    };
    try {
      dispatch(setLoading(true));
      const result = await axios.post(`${BASE_URL}/auth/register`, body, {
        validateStatus: status => status < 501,
      });
      if (result.status === 201) {
        Alert.alert('Success', `${result.data.message}`, [
          {
            text: 'Go to Login Page',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert('Failed', `${result.data.message}`);
      }
    } catch (err) {
    } finally {
      dispatch(setLoading(false));
    }
  };
