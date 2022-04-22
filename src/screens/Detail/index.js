import {
  View,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  StyleSheet,
  Dimensions,
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
import {moderateScale as ms} from 'react-native-size-matters';
import Pdf from 'react-native-pdf';

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

  const [pdf, setPdf] = useState(false);

  return (
    <View style={styles.container}>
      <View style={pdf ? styles.pdfContainer : styles.pdfContainerActive}>
        <TouchableOpacity onPress={() => setPdf(false)}>
          <Comfortaa>Tutup Buku</Comfortaa>
        </TouchableOpacity>
        <Pdf
          source={{
            uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
          }}
          style={pdf ? styles.pdfActive : styles.pdf}
        />
      </View>
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
                size={ms(20)}
                color={colors.primaryLight}
                solid
              />
            ) : (
              <FontAwesome5
                name="heart"
                size={ms(20)}
                color={colors.primaryLight}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={shareBook} style={styles.shared}>
            <FontAwesome5
              name="share"
              size={ms(20)}
              color={colors.primaryLight}
            />
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
          <Comfortaa type="Bold" size={ms(20)} style={styles.title}>
            {detailBooks.title}
          </Comfortaa>
          <Comfortaa>Author : {detailBooks.author}</Comfortaa>
          <Comfortaa>Publisher : {detailBooks.publisher}</Comfortaa>
        </View>
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
              size={ms(10)}
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
          <TouchableOpacity onPress={() => setPdf(true)} style={styles.price}>
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
        <Comfortaa type="Bold" size={ms(20)} style={styles.overview}>
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
  );
}

const styles = StyleSheet.create({
  pdfContainer: {
    display: 'none',
    position: 'absolute',
    top: 0,
    marginTop: -hp('50%'),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfContainerActive: {
    display: 'flex',
    position: 'absolute',
  },
  pdf: {
    width: wp('100%'),
    height: ms(600),
    display: 'none',
    marginLeft: ms(-15),
    marginTop: ms(10),
  },
  pdfActive: {
    width: wp('100%'),
    height: ms(600),
    display: 'flex',
    marginLeft: ms(-15),
    marginTop: ms(10),
  },
  container: {
    backgroundColor: colors.primaryDark,
    width: wp('100%'),
    height: hp('100%'),
    padding: ms(15),
  },
  content: {
    marginTop: ms(-15),
    marginHorizontal: ms(-15),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
  },
  button: {
    borderRadius: ms(40),
    width: ms(40),
    height: ms(40),
    padding: ms(10),
    backgroundColor: colors.primaryDark,
  },
  title: {
    width: wp('60%'),
    marginBottom: ms(5),
  },
  image: {
    width: ms(120),
    height: ms(40),
    padding: ms(10),
  },
  buttonContainer: {flexDirection: 'row'},
  loved: {
    borderRadius: ms(40),
    width: ms(40),
    height: ms(40),
    padding: ms(10),
    backgroundColor: colors.primaryDark,
    marginRight: ms(10),
  },
  shared: {
    borderRadius: ms(40),
    width: ms(40),
    height: ms(40),
    padding: ms(10),
    backgroundColor: colors.primaryDark,
  },
  header: {
    flexDirection: 'row',
    padding: ms(10),
    marginTop: ms(20),
  },
  cover: {
    width: ms(100),
    height: ms(150),
    borderRadius: ms(3),
    marginRight: ms(10),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: ms(20),
    backgroundColor: colors.primary,
    padding: ms(20),
    borderRadius: ms(5),
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
    marginTop: ms(-2),
    marginRight: ms(3),
  },
  price: {
    backgroundColor: colors.primaryDark,
    padding: ms(7),
    borderRadius: ms(5),
  },
  priceValue: {letterSpacing: ms(1)},
  overview: {
    marginBottom: ms(10),
    marginTop: ms(15),
  },
  overviewContainer: {textAlign: 'justify'},
  overviewText: {lineHeight: ms(25)},
});
