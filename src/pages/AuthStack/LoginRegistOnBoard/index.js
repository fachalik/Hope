/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../assets/colors';
import {LogoTemp} from '../../../assets';
import Carousel from '../../../components/Carousel/Carousel';
import dummyData from '../../../components/Carousel/DummyData';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const LoginRegistOnBoard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar
          translucent
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={{alignSelf: 'flex-start', marginLeft: 20}}>
          <LogoTemp />
        </View>
        <Carousel data={dummyData} />
      </View>
      <View style={styles.footer}>
        <View style={styles.ViewButton}>
          <TouchableOpacity
            style={styles.buttonfooter}
            onPress={() => navigation.navigate('RegisterStep3')}>
            <View style={styles.textRegist}>
              <Text style={styles.buttonTextLogin}>DAFTAR</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonfooter}
            onPress={() => navigation.navigate('Login')}>
            <View style={styles.textLogin}>
              <Text style={styles.buttonTextRegister}>MASUK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginRegistOnBoard;
const radius_size = 4;
const button_height = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    height: hp('70%'),
    marginTop: 50,
    backgroundColor: colors.backgroundColor,
    // height: 100,
  },
  footer: {
    height: hp('20%'),
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  RightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  RightText: {
    color: colors.blue,
    fontFamily: 'Karla-SemiBold',
    fontSize: 14,
  },
  LeftButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  LeftText: {
    color: colors.blue,
    fontFamily: 'Karla-SemiBold',
    fontSize: 14,
  },
  dotStyle: {
    backgroundColor: colors.gray,
  },
  activeDotStyle: {
    backgroundColor: colors.warning,
  },
  titlefooter: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textfooter: {
    color: 'grey',
    marginTop: 5,
  },
  buttonfooter: {
    paddingVertical: 5,
  },
  textLogin: {
    color: colors.white,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90%'),
    height: button_height,
    borderRadius: radius_size,
    borderWidth: 1,
    borderColor: '#F2C94C',
  },

  textRegist: {
    backgroundColor: colors.orange,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90%'),
    height: button_height,
    borderRadius: radius_size,
    borderColor: '#F2C94C',
  },

  buttonTextRegister: {
    fontSize: 16,
    fontFamily: 'Karla-Bold',
    color: '#F9DB7E',
    // color: colors.white,
  },
  buttonTextLogin: {
    fontSize: 16,
    fontFamily: 'Karla-Bold',
    color: colors.white,
    // color: '#F9DB7E',
  },
});
