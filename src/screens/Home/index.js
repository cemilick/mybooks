import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
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
import {moderateScale as ms} from 'react-native-size-matters';

export default function Index({navigation}) {
  const {books} = useSelector(state => state.home);
  const {name} = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnection());
    dispatch(getRecommendedBooks());
  }, [dispatch]);

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
      Alert.alert(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryDark,
      width: wp('100%'),
      height: hp('100%'),
      padding: wp(5),
    },
    header: {
      marginTop: -wp(5),
      marginHorizontal: -wp(5),
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(7),
      paddingVertical: wp(3),
    },
    logo: {
      width: wp(35),
      height: wp(12),
      marginLeft: -wp(5),
    },
    logout: {
      backgroundColor: colors.primaryDark,
      padding: wp(2),
      borderRadius: wp(2),
    },
    hello: {
      marginTop: ms(10),
      marginBottom: ms(20),
    },
    recommended: {marginBottom: ms(10)},
    popular: {
      marginBottom: ms(10),
      marginTop: -hp('20%'),
    },
    flex: {flex: 1},
    image: {
      width: wp('28%'),
      height: hp('20%'),
      marginRight: ms(15),
      borderRadius: ms(5),
    },
    title: {width: wp('30%')},
    title2: {
      width: wp('30%'),
      marginBottom: ms(15),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="cover" />
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
          style={styles.logout}>
          <Comfortaa>Logout</Comfortaa>
        </TouchableOpacity>
      </View>
      <Comfortaa size={ms(16)} style={styles.hello}>
        Hello {name}, Welcome Back!
      </Comfortaa>
      <Comfortaa type="Bold" size={ms(20)} style={styles.recommended}>
        Recommended
      </Comfortaa>
      <FlatList
        style={styles.flex}
        horizontal={true}
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => isConnected(item.id)}>
              <Image
                source={{uri: `${item.cover_image}`}}
                style={styles.image}
                resizeMode="cover"
              />
              <Comfortaa style={styles.title}>{item.title}</Comfortaa>
            </TouchableOpacity>
          );
        }}
      />
      <Comfortaa type="Bold" size={ms(20)} style={styles.popular}>
        Popular
      </Comfortaa>
      <FlatList
        style={styles.flex}
        numColumns={3}
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => isConnected(item.id)}>
              <Image
                source={{uri: `${item.cover_image}`}}
                style={styles.image}
                resizeMode="cover"
              />
              <Comfortaa style={styles.title2}>{item.title}</Comfortaa>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
