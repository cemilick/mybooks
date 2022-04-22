import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Netinfo from '@react-native-community/netinfo';
import Comfortaa from '../Comfortaa';
import {colors} from '../../res/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {setConnected} from '../../store/globalAction';

export default function Index() {
  const {connected} = useSelector(state => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnection());
  }, [dispatch]);

  if (!connected) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="wifi-off" color={colors.primary} size={wp(30)} />
        <Comfortaa style={styles.title} type="Bold" size={20}>
          No Connection
        </Comfortaa>
        <Comfortaa style={styles.text} size={16}>
          Please connect to a WiFi or Data Seluler then click button below.
        </Comfortaa>
        <TouchableOpacity onPress={() => dispatch(getConnection())}>
          <Comfortaa style={styles.button}>Refresh</Comfortaa>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    backgroundColor: colors.primaryLight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    color: colors.primary,
  },
  text: {
    color: colors.primary,
    width: wp(70),
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.primary,
    width: wp(30),
    textAlign: 'center',
    marginTop: 30,
  },
});

export const getConnection = () => async dispatch => {
  try {
    await Netinfo.fetch().then(state => {
      console.log(state.isConnected);
      dispatch(setConnected(state.isConnected));
    });
  } catch (err) {
    console.log(err);
  } finally {
  }
};
