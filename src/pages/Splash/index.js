import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {SplashBackground, logo} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../assets/colors';

const Splash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="stretch" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.logoTitle}>Hope</Text>
        <Text style={styles.logoText}>The Complete Health Solution</Text>
      </View>
    </View>
  );
};

export default Splash;
const windowHeight = Dimensions.get('screen').height;
const height_logo = windowHeight * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9CB6F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height_logo,
    width: height_logo,
  },
  logoTitle: {
    color: color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 62,
  },
  logoText: {
    color: color.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
});
