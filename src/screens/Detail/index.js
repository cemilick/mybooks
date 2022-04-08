import {View, Image, TouchableOpacity, Share, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDetailBooks} from './redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../res/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Comfortaa from '../../components/Comfortaa';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import logo from '../../assets/images/logo2.png';
import toIDR from '../../helpers/toIDR';
import {notification} from '../../helpers/Notification';
import Loading from '../../components/Loading';

export default function Index({navigation, route}) {
  const dispatch = useDispatch();
  const id = route.params.id;
  const {token} = useSelector(state => state.login);
  const {detailBooks} = useSelector(state => state.detail);
  const [loved, setLoved] = useState(false);

  const shareBook = async () => {
    try {
      await Share.share({
        message: `${detailBooks.title} is very amazing! You should read this book!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    if (detailBooks.id !== id) dispatch(getDetailBooks(id, token));
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors.primaryDark,
        width: wp('100%'),
        height: hp('100%'),
        padding: 15,
      }}>
      <Loading transparent={false} />
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
        <TouchableOpacity
          style={{
            borderRadius: 40,
            width: 40,
            height: 40,
            padding: 10,
            backgroundColor: colors.primaryDark,
          }}
          onPress={() => navigation.navigate('Home')}>
          <FontAwesome5
            name="arrow-left"
            size={20}
            color={colors.primaryLight}
          />
        </TouchableOpacity>
        <Image
          source={logo}
          style={{width: 150, height: 50}}
          resizeMode="cover"
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setLoved(!loved);
              notification.configure();
              notification.createChannel('1');
              loved
                ? notification.sendNotification(
                    '1',
                    'Unlike it!',
                    `${detailBooks.title} is successfully unliked right now!`,
                  )
                : notification.sendNotification(
                    '1',
                    'Love it!',
                    `${detailBooks.title} is successfully loved right now!`,
                  );
            }}
            style={{
              borderRadius: 40,
              width: 40,
              height: 40,
              padding: 10,
              backgroundColor: colors.primaryDark,
              marginRight: 10,
            }}>
            {loved ? (
              <FontAwesome5
                name="heart"
                size={20}
                color={colors.primaryLight}
                solid
              />
            ) : (
              <FontAwesome5
                name="heart"
                size={20}
                color={colors.primaryLight}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareBook}
            style={{
              borderRadius: 40,
              width: 40,
              height: 40,
              padding: 10,
              backgroundColor: colors.primaryDark,
            }}>
            <FontAwesome5 name="share" size={20} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{padding: 10, marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: `${detailBooks.cover_image}`}}
            style={{width: 100, height: 150, borderRadius: 3, marginRight: 10}}
            resizeMode="cover"
          />
          <View>
            <Comfortaa
              type="Bold"
              size={20}
              style={{width: wp('60%'), marginBottom: 5}}>
              {detailBooks.title}
            </Comfortaa>
            <Comfortaa>Author : {detailBooks.author}</Comfortaa>
            <Comfortaa>Publisher : {detailBooks.publisher}</Comfortaa>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 5,
          }}>
          <View style={{alignItems: 'center'}}>
            <Comfortaa type="Bold" style={{color: colors.primaryDark}}>
              Rating
            </Comfortaa>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Comfortaa
                style={{
                  color: colors.primaryDark,
                  marginTop: -2,
                  marginRight: 3,
                }}>
                {detailBooks.average_rating}
              </Comfortaa>

              <FontAwesome5
                name="star"
                size={10}
                color={colors.primaryDark}
                solid
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Comfortaa type="Bold" style={{color: colors.primaryDark}}>
              Total Sale
            </Comfortaa>
            <Comfortaa style={{color: colors.primaryDark}}>
              {detailBooks.total_sale}
            </Comfortaa>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Coming Soon',
                  'This features will be added in next update',
                )
              }
              style={{
                backgroundColor: colors.primaryDark,
                padding: 7,
                borderRadius: 5,
              }}>
              <Comfortaa>
                Buy Rp.{' '}
                <Comfortaa style={{letterSpacing: 1}}>
                  {detailBooks.price ? toIDR(detailBooks.price) : ''}
                  ,-
                </Comfortaa>
              </Comfortaa>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Comfortaa
            type="Bold"
            size={20}
            style={{marginBottom: 10, marginTop: 15}}>
            Overview
          </Comfortaa>
          <Comfortaa style={{textAlign: 'justify'}}>
            {detailBooks.synopsis
              ? detailBooks.synopsis.split(' ').map((word, i) => {
                  return (
                    <Comfortaa style={{lineHeight: 25}}>{word} </Comfortaa>
                  );
                })
              : ''}
          </Comfortaa>
        </View>
      </View>
    </View>
  );
}
