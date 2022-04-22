import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Netinfo from '@react-native-community/netinfo';
import Comfortaa from '../Comfortaa';
import {colors} from '../../res/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {setConnected, setLoading} from '../../store/globalAction';

export default function Index() {
  const {connected} = useSelector(state => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnection());
  }, []);

  if (!connected) {
    return (
      <View
        style={{
          height: hp(100),
          width: wp(100),
          backgroundColor: colors.primaryLight,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
        <MaterialIcons name="wifi-off" color={colors.primary} size={wp(30)} />
        <Comfortaa style={{color: colors.primary}} type="Bold" size={20}>
          No Connection
        </Comfortaa>
        <Comfortaa
          style={{color: colors.primary, width: wp(70), textAlign: 'center'}}
          size={16}>
          Please connect to a WiFi or Data Seluler then click button below.
        </Comfortaa>
        <TouchableOpacity onPress={() => dispatch(getConnection())}>
          <Comfortaa
            style={{
              borderRadius: 5,
              padding: 10,
              backgroundColor: colors.primary,
              width: wp(30),
              textAlign: 'center',
              marginTop: 30,
            }}>
            Refresh
          </Comfortaa>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
}

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
