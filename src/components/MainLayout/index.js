import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import colors from '../../assets/colors';
import LoadingV2 from '../Universal/LoadingV2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MainLayout = ({children, boolean}) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView style={styles.wrapper}>{children}</ScrollView>
      {boolean ? <LoadingV2 /> : null}
    </KeyboardAvoidingView>
  );
};

export default MainLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  wrapper: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
});
