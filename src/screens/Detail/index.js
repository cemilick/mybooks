import {
  View,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  StyleSheet,
} from 'react-native';
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
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    if (detailBooks.id !== id) {
      dispatch(getDetailBooks(id, token));
    }
  }, [dispatch, detailBooks.id, id, token]);

  return (
    <View style={styles.container}>
      <Loading transparent={false} />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <FontAwesome5
            name="arrow-left"
            size={20}
            color={colors.primaryLight}
          />
        </TouchableOpacity>
        <Image source={logo} style={styles.image} resizeMode="cover" />
        <View style={styles.buttonContainer}>
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
            style={styles.loved}>
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
          <TouchableOpacity onPress={shareBook} style={styles.shared}>
            <FontAwesome5 name="share" size={20} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <Image
          source={{uri: `${detailBooks.cover_image}`}}
          style={styles.cover}
          resizeMode="cover"
        />
        <View>
          <Comfortaa type="Bold" size={20} style={styles.title}>
            {detailBooks.title}
          </Comfortaa>
          <Comfortaa>Author : {detailBooks.author}</Comfortaa>
          <Comfortaa>Publisher : {detailBooks.publisher}</Comfortaa>
        </View>
        <View style={styles.card}>
          <View style={styles.center}>
            <Comfortaa type="Bold" style={styles.cardText}>
              Rating
            </Comfortaa>
            <View style={styles.ratingContainer}>
              <Comfortaa style={styles.ratingValue}>
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
          <View style={styles.center}>
            <Comfortaa type="Bold" style={styles.cardText}>
              Total Sale
            </Comfortaa>
            <Comfortaa style={styles.cardText}>
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
              style={styles.price}>
              <Comfortaa>
                Buy Rp.{' '}
                <Comfortaa style={styles.priceValue}>
                  {detailBooks.price ? toIDR(detailBooks.price) : ''}
                  ,-
                </Comfortaa>
              </Comfortaa>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Comfortaa type="Bold" size={20} style={styles.overview}>
            Overview
          </Comfortaa>
          <Comfortaa style={styles.overviewContainer}>
            {detailBooks.synopsis
              ? detailBooks.synopsis.split(' ').map(word => {
                  return (
                    <Comfortaa style={styles.overviewText}>{word} </Comfortaa>
                  );
                })
              : ''}
          </Comfortaa>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    width: wp('100%'),
    height: hp('100%'),
    padding: 15,
  },
  content: {
    marginTop: -15,
    marginHorizontal: -15,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 40,
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: colors.primaryDark,
  },
  title: {
    width: wp('60%'),
    marginBottom: 5,
  },
  image: {
    borderRadius: 40,
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: colors.primaryDark,
  },
  buttonContainer: {flexDirection: 'row'},
  loved: {
    borderRadius: 40,
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: colors.primaryDark,
    marginRight: 10,
  },
  shared: {
    borderRadius: 40,
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: colors.primaryDark,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
  },
  cover: {
    width: 100,
    height: 150,
    borderRadius: 3,
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 5,
  },
  center: {alignItems: 'center'},
  cardText: {color: colors.primaryDark},
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  ratingValue: {
    color: colors.primaryDark,
    marginTop: -2,
    marginRight: 3,
  },
  price: {
    backgroundColor: colors.primaryDark,
    padding: 7,
    borderRadius: 5,
  },
  priceValue: {letterSpacing: 1},
  overview: {
    marginBottom: 10,
    marginTop: 15,
  },
  overviewContainer: {textAlign: 'justify'},
  overviewText: {lineHeight: 25},
});
