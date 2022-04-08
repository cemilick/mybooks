import {View, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {getRecommendedBooks} from './redux/action';
import Comfortaa from '../../components/Comfortaa';
import {colors} from '../../res/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import logo from '../../assets/images/logo2.png';
import {getConnection} from '../../components/NoConnection';
import Netinfo from '@react-native-community/netinfo';
import {setConnected, setLoading} from '../../store/globalAction';
import {setToken} from '../Login/redux/action';

export default function Index({navigation}) {
  const {books} = useSelector(state => state.home);
  const {name} = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnection());
    dispatch(getRecommendedBooks());
  }, []);

  console.log(books);

  const isConnected = id => {
    try {
      dispatch(setLoading(true));
      Netinfo.fetch().then(state => {
        dispatch(setConnected(state.isConnected));
        state.isConnected
          ? navigation.navigate('Detail', {id: id})
          : dispatch(getConnection());
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.primaryDark,
        width: wp('100%'),
        height: hp('100%'),
        padding: 15,
      }}>
      <View
        style={{
          marginTop: -15,
          marginHorizontal: -15,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <Image
          source={logo}
          style={{width: 150, height: 50, marginLeft: -15}}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(setToken(null));
            Alert.alert('Success', 'Logout Successfull', [
              {
                text: 'Go to Login Page',
                onPress: () => navigation.navigate('Login'),
              },
            ]);
          }}
          style={{
            backgroundColor: colors.primaryDark,
            padding: 8,
            borderRadius: 8,
          }}>
          <Comfortaa>Logout</Comfortaa>
        </TouchableOpacity>
      </View>
      <Comfortaa size={16} style={{marginTop: 10, marginBottom: 20}}>
        Hello {name}, Welcome Back!
      </Comfortaa>
      <Comfortaa type="Bold" size={20} style={{marginBottom: 10}}>
        Recommended
      </Comfortaa>
      <FlatList
        style={{flex: 1}}
        horizontal={true}
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => isConnected(item.id)}>
              <Image
                source={{uri: `${item.cover_image}`}}
                style={{
                  width: wp('28%'),
                  height: hp('20%'),
                  marginRight: 15,
                  borderRadius: 5,
                }}
                resizeMode="cover"
              />
              <Comfortaa style={{width: wp('30%')}}>{item.title}</Comfortaa>
            </TouchableOpacity>
          );
        }}
      />
      <Comfortaa
        type="Bold"
        size={20}
        style={{marginBottom: 10, marginTop: -hp('20%')}}>
        Popular
      </Comfortaa>
      <FlatList
        style={{flex: 1}}
        numColumns={3}
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => isConnected(item.id)}>
              <Image
                source={{uri: `${item.cover_image}`}}
                style={{
                  width: wp('28%'),
                  height: hp('20%'),
                  marginRight: 15,
                  borderRadius: 5,
                }}
                resizeMode="cover"
              />
              <Comfortaa style={{width: wp('30%'), marginBottom: 15}}>
                {item.title}
              </Comfortaa>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
