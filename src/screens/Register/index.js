import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../res/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../assets/images/logo.png';
import Comfortaa from '../../components/Comfortaa';
import {getConnection} from '../../components/NoConnection';
import {useDispatch} from 'react-redux';
import {Registration} from './redux/action';

export default function Index({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getConnection());
  }, [dispatch]);

  return (
    <ScrollView style={{backgroundColor: colors.primaryDark}}>
      <View style={styles.circleTopContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
      <View style={styles.allContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.formContainer}>
          <Fumi
            style={styles.form}
            label={'Fullname'}
            iconClass={FontAwesome5}
            iconName={'user'}
            iconColor={colors.primary}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            onChangeText={text => setName(text)}
          />
          <Fumi
            style={styles.form}
            label={'Email'}
            iconClass={FontAwesome5}
            iconName={'envelope'}
            iconColor={colors.primary}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            onChangeText={text => setEmail(text)}
          />
          <Fumi
            style={styles.form}
            label={'Password'}
            iconClass={FontAwesome5}
            iconName={'lock'}
            iconColor={colors.primary}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch(Registration(email, password, name, navigation));
            }}>
            <Comfortaa>Register</Comfortaa>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Comfortaa>Already have an Account?</Comfortaa>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Comfortaa type="Bold" decoration="underline">
              Login here!
            </Comfortaa>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.circleBottomContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    width: wp(100),
    height: hp(100),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginBottom: 8,
    borderRadius: 5,
    width: wp(80),
  },
  formContainer: {
    backgroundColor: colors.primary,
    width: wp(90),
    padding: wp(5),
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    width: wp(100),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primaryDark,
    padding: 10,
    alignItems: 'center',
    width: wp(50),
    borderRadius: 5,
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 25,
  },
  circle: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  circleTopContainer: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp(15),
    width: wp(100),
  },
  circleBottomContainer: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp(15),
    width: wp(100),
    bottom: 0,
  },
});
